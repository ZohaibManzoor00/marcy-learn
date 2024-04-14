"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import FileUpload from "@/components/file-upload";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { RiUploadCloud2Line } from "react-icons/ri";

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export default function ChapterVideoForm({ initialData, courseId, chapterId }: ChapterVideoFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing(!isEditing);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
      toast.success("Chapter video updated");
      router.refresh();
      toggleEdit();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-900 rounded-md p-4">
      <div className="font-medium flex items-center justify-between mb-2">
        Chapter video
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}

          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" /> Change video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
          </div>
        ))}
      {isEditing && (
        <>
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md mb-4">
            <RiUploadCloud2Line className="h-10 w-10 text-slate-500" />
          </div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) onSubmit({ videoUrl: url });
            }}
            video
          />
          <div className="text-xs text-muted-foreground mt-4">
            Upload this chapter&apos;s video
          </div>
        </>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take a few minutes to process. Refresh the page if video
          does not appear.
        </div>
      )}
    </div>
  );
}
