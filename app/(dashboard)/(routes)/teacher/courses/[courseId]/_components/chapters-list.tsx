"use client";

import { useEffect, useState } from "react";
import { Chapter } from "@prisma/client";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Grip, Pencil } from "lucide-react";

interface ChaptersListProps {
  items: Chapter[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

export default function ChaptersList({
  items,
  onReorder,
  onEdit,
}: ChaptersListProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => setIsMounted(true), []);
  useEffect(() => setChapters(items), [items]);

  if (!isMounted) return null;

  const onDragEng = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(chapters);
    const [reorderItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderItem);

    const startIdx = Math.min(result.source.index, result.destination.index);
    const endIdx = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIdx, endIdx + 1);

    setChapters(items);

    const bulkUpdateDate = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id),
    }));

    onReorder(bulkUpdateDate);
  };

  return (
    <DragDropContext onDragEnd={onDragEng}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, idx) => (
              <Draggable key={chapter.id} index={idx} draggableId={chapter.id}>
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 dark:text-gray-300 dark:bg-slate-900 border-slate-200 dark:border-slate-600  border text-slate-700 rounded-md mb-4 text-sm",
                      chapter.isPublished &&
                        "bg-sky-100 border-sky-200 text-sky-700 dark:bg-sky-950 dark:text-sky-400"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "px-2 py-2 border-r dark:hover:bg-zinc-600 border-r-slate-300 dark:border-r-slate-600 hover:bg-slate-300 rounded-l-md transition",
                        chapter.isPublished &&
                          "border-r-sky-200 hover:bg-sky-200 dark:hover:bg-sky-900 dark:border-r-sky-800"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    {chapter.title}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      {!chapter.isFree && (
                        <Badge className="dark:bg-zinc-900 dark:hover:bg-slate-950 dark:text-gray-100">
                          Locked
                        </Badge>
                      )}
                      <Badge
                        className={cn(
                          "bg-slate-500 dark:text-gray-100 dark:hover:bg-slate-700",
                          chapter.isPublished &&
                            "bg-sky-700 dark:hover:bg-sky-800 hover:bg-sky-800"
                        )}
                      >
                        {chapter.isPublished ? "Published" : "Draft"}
                      </Badge>
                      <Pencil
                        onClick={() => onEdit(chapter.id)}
                        className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
