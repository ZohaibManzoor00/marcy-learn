import { cn } from "@/lib/utils";

export default function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse bg-slate-100 dark:bg-slate-800 rounded h-20",
        className
      )}
      {...props}
    />
  );
}
