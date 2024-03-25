"use client";

import { useState } from "react";
import { Attachment } from "@prisma/client";

import { ChevronsUpDown, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface CollapsibleAttachmentsProps {
  attachments: Attachment[];
}

export function CollapsibleAttachments({ attachments }: CollapsibleAttachmentsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <div className="text-xl mt-5 flex gap-x-2">
          <p className="font-semibold">{attachments.length}</p>
          {attachments.length === 1 ? "Attachment" : "Attachments"}
        </div>
        {attachments.length > 1 && (
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        )}
      </div>
      <div className="px-4 rounded-md font-mono text-sm">
        <a
          href={attachments[0].url}
          key={attachments[0].id}
          target="_blank"
          className="flex items-center mb-1 p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
        >
          <File />
          <p className="line-clamp-1">{attachments[0].name}</p>
        </a>
      </div>
      <CollapsibleContent className="">
        {!!attachments.length && (
          <>
            <div className="px-4 rounded-md  font-mono text-sm">
              {attachments.slice(1).map((attachment) => (
                <a
                  href={attachment.url}
                  key={attachment.id}
                  target="_blank"
                  className="flex items-center mb-1 p-3 w-full bg-sky-200 border text-sky-700 rounded-md
                  hover:underline"
                >
                  <File />
                  <p className="line-clamp-1">{attachment.name}</p>
                </a>
              ))}
            </div>
          </>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
