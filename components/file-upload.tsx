"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { UploadButton } from "../lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Spinner } from "./spinner";

interface FileUploadProps {
  onChange: (url?: string, name?: string) => void;
  endpoint: keyof typeof ourFileRouter;
  video?: boolean
}

export default function FileUpload({ onChange, endpoint, video }: FileUploadProps) {
  const [loading, setIsLoading] = useState(false);

  if (!video && loading)
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );

  return (
    <UploadButton
      endpoint={endpoint}
      onUploadBegin={() => setIsLoading(true)}
      onClientUploadComplete={(
        res: { url: string | undefined; name: string | undefined }[]) => {
        onChange(res?.[0].url, res?.[0]?.name);
        setIsLoading(false);
      }}
      onUploadError={(error: Error) => toast.error(`${error?.message}`)}
    />
  );
}
