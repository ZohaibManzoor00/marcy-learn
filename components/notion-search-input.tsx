"use client";

import { useState, useEffect } from "react";
import { File } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

// import { useSearch } from "@/hooks/use-search";
// import { api } from "@/convex/_generated/api";

export const NotionSearchInput = () => {
  const { user } = useUser();
  const router = useRouter();
//   const documents = useQuery(api.documents.getSearch);
  const [isMounted, setIsMounted] = useState(false);

//   const toggle = useSearch((store) => store.toggle);
//   const isOpen = useSearch((store) => store.isOpen);
//   const onClose = useSearch((store) => store.onClose);

  useEffect(() => setIsMounted(true), []);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        // toggle();
      }
    };

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, []);

  const onSelect = (id: string) => {
    router.push(`/documents/${id}`);
    // onClose();
  };

  if (!isMounted) return null;
  let isOpen = false
  const onOpen = () => isOpen = true
  const onClose = () => isOpen = false
  const toggle = () => isOpen = !isOpen

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder={`Search ${user?.fullName}'s Ocean...`} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="documents">
            YOO
          {/* {documents?.map((document) => (
            <CommandItem
              key={document._id}
              value={`${document._id}-${document.title}`}
              title={document.title}
              onSelect={onSelect}
            >
              {document.icon ? (
                <p className="mr-2 text-[18px]">{document.icon}</p>
              ) : (
                <File className="mr-2 h-4 w-4" />
              )}
              <span>{document.title}</span>
            </CommandItem>
          ))} */}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};