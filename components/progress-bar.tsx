"use client";

import { useState, useEffect } from "react";

import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  value: number;
  variant?: "default" | "primary" | "success";
}

export function ProgressBar({ value, variant }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => setProgress(value), [value]); 

  return (
    <div className="transition-all duration-500 ease-in-out hover:animate-pulse">
      <Progress className="h-2" value={progress} variant={variant} />
    </div>
  );
}
