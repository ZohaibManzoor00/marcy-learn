"use client";

import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";

interface CourseSidebarItemProps {
  label: string;
  id: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
}

export default function CourseSidebarItem({
  label,
  id,
  isCompleted,
  courseId,
  isLocked,
}: CourseSidebarItemProps) {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;

  const isActive = pathname?.includes(id);

  const onClick = () => router.push(`/courses/${courseId}/chapters/${id}`);

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 dark:text-white text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20 dark:hover:bg-slate-600/20",
        isActive &&
          "text-slate-700 dark:bg-slate-900 dark:text-white bg-slate-300/20 hover:bg-slate-200/20 hover:text-slate-700",
        isCompleted &&
          "text-emerald-700 dark:text-emerald-500 hover:text-emerald-700 hover:bg-emerald-700/20 dark:hover:bg-emerald-600/20 ",
        isActive && isCompleted && "bg-emerald-200/20 dark:bg-emerald-700/20"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-slate-500 dark:text-slate-400",
            isActive &&
              `text-slate-700 dark:text-slate-200 ${isCompleted && "dark:text-emerald-300"}`,
            isCompleted && "text-emerald-700 dark:text-emerald-500",
            isActive && isCompleted && "dark:text-emerald-300"
          )}
        />
        <span className="line-clamp-1">{label}</span>
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-gray-200 h-full transition-all",
          isActive && "opacity-100 border-zinc-700 dark:border-gray-200",
          isCompleted && "border-emerald-700 dark:border-emerald-700"
        )}
      ></div>
    </button>
  );
}
