"use client";

import { useState, useEffect } from "react";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  variant?: "default" | "primary" | "success";
  className?: string;
}

export function ProgressBar({ value, variant, className }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => setProgress(value), [value]);

  return (
    <div
      className={cn(
        "transition-all duration-500 ease-in-out hover:animate-pulse",
        className
      )}
    >
      <Progress className="h-2" value={progress} variant={variant} />
    </div>
  );
}
