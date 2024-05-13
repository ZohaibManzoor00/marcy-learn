"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen, CalendarDays } from "lucide-react";

import IconBadge from "@/components/icon-badge";
import CourseProgress from "@/components/course-progress";

import { formatDate } from "@/lib/format-date";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PathwayCourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  description: string | null;
  courseLength: number;
  progress: number | null;
  createdAt: Date;
}

export default function PathwayCourseCard({
  id,
  title,
  imageUrl,
  description,
  courseLength,
  progress,
  createdAt,
}: PathwayCourseCardProps) {

  return (
    <Link href={`/pathways/${id}/courses`}>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="group hover:shadow-sm hover:bg-slate-200/20 dark:hover:bg-slate-800/25 transition overflow-hidden border rounded-lg p-3 h-full">
              <div className="relative w-full aspect-video rounded-md overflow-hidden">
                <Image
                  fill
                  className="object-cover"
                  alt={title}
                  src={imageUrl}
                />
              </div>
              <div className="flex flex-col pt-2">
                <div className="text-lg md:text-base font-medium group-hover:text-sky-800 dark:group-hover:text-sky-200 transition line-clamp-2">
                  {title}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {description}
                </p>
                <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                  <div className="flex items-center gap-x-1 text-slate-500">
                    <IconBadge size="sm" icon={BookOpen} variant={"primary"} />
                    <span className="dark:text-slate-400">
                      {courseLength} {courseLength === 1 ? "Course" : "Courses"}
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
                  <p className="text-xs  text-muted-foreground pb-2 font-medium uppercase">
                    Enroll Today
                  </p>
                )}
                {/* <div className="flex justify-end pt-2">
                  <CalendarDays className="mr-1 h-4 w-4 opacity-70" />{" "}
                  <span className="text-xs text-muted-foreground">
                    {formatDate(createdAt)}
                  </span>
                </div> */}
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p className="text-xs p-2 w-80 md:w-60">{description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Link>
  );
}
