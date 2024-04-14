"use client";

import Image from "next/image";
import Link from "next/link";
import IconBadge from "@/components/icon-badge";
import { BookOpen } from "lucide-react";
import CourseProgress from "@/components/course-progress";

interface PathwayCourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  description: string | null;
  courseLength: number;
  progress: number | null;
  // category: string;
}

export default function PathwayCourseCard({
  id,
  title,
  imageUrl,
  description,
  courseLength,
  progress,
}: 
// category,
PathwayCourseCardProps) {
  return (
    <Link href={`/pathways/${id}/courses`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image fill className="object-cover" alt={title} src={imageUrl} />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-800 dark:group-hover:text-sky-600 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{description}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} variant={"primary"} />
              <span>
                {courseLength} {courseLength === 1 ? "Course" : "Courses"}
              </span>
            </div>
          </div>
          <CourseProgress
            variant={progress === 100 ? "success" : "primary"}
            size="sm"
            value={progress || 0}
          />
        </div>
      </div>
    </Link>
  );
}
