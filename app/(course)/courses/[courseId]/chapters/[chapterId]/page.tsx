import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getChapter } from "@/actions/get-chapter";
import Banner from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";

import { VideoPlayer } from "./_components/video-player";
import CourseProgressButton from "./_components/course-progress-button";
import { CollapsibleAttachments } from "./_components/collapsible-attachment";
import { getProgress } from "@/actions/get-progress";

export default async function ChapterIdPage({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const { chapter, course, muxData, attachments, nextChapter, userProgress } =
    await getChapter({
      userId,
      chapterId: params.chapterId,
      courseId: params.courseId,
    });

  if (!chapter || !course) return redirect("/");

  const completeOnEnd = !userProgress?.isCompleted;
  
  const isLocked = !chapter.isFree;

  const progress  = await getProgress(userId, course.id)

  return (
    <div>
      {" "}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to wait to watch this chapter."
          dark="black"
        />
      )}
      {userProgress?.isCompleted && progress != 100 && (
        <Banner variant="success" label="You already completed this chapter." />
      )}
      {!nextChapter && progress == 100 && (
        <Banner
          variant="success"
          label="Congratulations you have finished this course!"
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
            {!isLocked && (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            )}
          </div>
          <Separator />
          {!isLocked && (
            <>
              <div>
                <Preview value={String(chapter.description)} />
              </div>
              <Separator />
              {!!attachments.length && (
                <CollapsibleAttachments attachments={attachments} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
