import { auth } from "@clerk/nextjs";
import { Pathway } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

import { getProgressByPathway } from "@/actions/get-pathways";
import SearchInput from "@/components/search-input";
import { PathwaysList } from "./_components/pathways-list";

type PathwayProps = Pathway & {
  progress?: number | null;
  courseCount?: number;
};

interface SearchProps {
  searchParams: { title: string; categoryId: string };
}

export default async function Pathways({ searchParams }: SearchProps) {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const pathways = (await db.pathway.findMany({
    where: { isPublished: true, title: { contains: searchParams.title } },
    orderBy: { createdAt: "desc" },
  })) as PathwayProps[];

  const pathwaysWithProgress = await getProgressByPathway(userId);

  for (const pathway of pathways) {
    const progressAndCourses = pathwaysWithProgress.find(
      (pway) => pway.pathwayId === pathway.id
    );
    pathway["progress"] = progressAndCourses?.totalProgress;
    pathway["courseCount"] = progressAndCourses?.totalCourses;
  }

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <PathwaysList items={pathways} />
      </div>
    </>
  );
}
