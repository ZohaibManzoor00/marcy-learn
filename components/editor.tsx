"use client";

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.snow.css";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
  editorType: string;
}

export const Editor = ({ onChange, value, editorType }: EditorProps) => {
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }),[]);

  return (
    <div className={cn("bg-white dark:bg-slate-800", editorType === 'snow' && "dark:bg-slate-900")}>
      <ReactQuill theme={editorType} value={value} onChange={onChange} />
    </div>
  );
};
