"use client";

import Image from "next/image";
import Link from "next/link";
import IconBadge from "@/components/icon-badge";
import { BookOpen } from "lucide-react";
import CourseProgress from "./course-progress";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  progress: number | null;
  category: string;
  description: string | null;
}

export default function CourseCard({
  id,
  title,
  imageUrl,
  chaptersLength,
  progress,
  category,
  description,
}: CourseCardProps) {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm hover:bg-slate-200/20 dark:hover:bg-slate-800/25 transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image fill className="object-cover" alt={title} src={imageUrl} />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-800 dark:group-hover:text-sky-200 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {description}
          </p>
          {/* <p className="text-xs text-muted-foreground">{description}</p> */}
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} variant={"primary"} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>
          {progress && progress > 0 ? (
            <CourseProgress
              variant={progress === 100 ? "success" : "primary"}
              size="sm"
              value={progress || 0}
            />
          ) : (
            <p className="text-xs text-muted-foreground line-clamp-1">
              Enroll Today
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
