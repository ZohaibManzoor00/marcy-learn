import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";
import { ProgressBar } from "./progress-bar";

interface CourseProgressProps {
  value: number;
  variant?: "default" | "success" | 'primary';
  size?: "default" | "sm";
}

const colorByVariant = {
  default: "text-zinc-700",
  success: "text-emerald-700 dark:text-emerald-500",
  primary: 'text-sky-700 dark:text-sky-500'
};

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
};

export default function CourseProgress({
  value,
  variant,
  size,
}: CourseProgressProps) {
  return (
    <div>
      {/* <Progress className="h-2" value={value} variant={variant} /> */}
      <ProgressBar value={value} variant={variant}/>
      <p
        className={cn(
          "font-medium text-zinc-700",
          colorByVariant[variant || "default"],
          sizeByVariant[size || "default"]
        )}
      >
        {Math.round(value)}% Complete
      </p>
    </div>
  );
}
