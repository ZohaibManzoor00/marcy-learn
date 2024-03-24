import SearchInput from "@/components/search-input";
import { db } from "@/lib/db";
import { PathwaysList } from "./_components/pathways-list";
import { getPathwayCourses } from "@/actions/get-pathway-courses";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getProgressByPathway } from "@/actions/get-pathways";
import { Pathway } from "@prisma/client";

type PathwayProps = Pathway & {
  progress?: number | null;
  courseCount?: number
}

export default async function Pathways() {
  const { userId } = auth();
  if (!userId) return redirect("/");
  const pathways = await db.pathway.findMany() as PathwayProps[]

  // let progress = 0;
  // for (const pathway of pathways) {
  //   const pathwayCourses = await getPathwayCourses({
  //     userId,
  //     pathwayId: pathway.id,
  //   });
  //   console.log(pathwayCourses)
  // }
  const pathwaysWithProgress = await getProgressByPathway(userId)

  for (const pathway of pathways) {
    const progressAndCourses = pathwaysWithProgress.find(pway => pway.pathwayId === pathway.id)
    pathway['progress'] = progressAndCourses?.totalProgress
    pathway['courseCount'] = progressAndCourses?.totalCourses
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
// userId,
// title,
// categoryId,
// pathwayId,
