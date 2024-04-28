import { db } from "@/lib/db";
import { getPathwayCourses } from "./get-pathway-courses";
import { Chapter, Pathway } from "@prisma/client";

interface GetProgressByPathwayProps {
  userId: string; 
  searchParams?: { title?: string; categoryId?: string }
}

type PathwayProps = Pathway & {
  progress?: number | null;
  courseCount?: number;
};

export async function getProgressByPathway({ userId, searchParams }: GetProgressByPathwayProps) {
  try {
    const pathways = (await db.pathway.findMany({
      where: { isPublished: true, title: { contains: searchParams?.title } },
      orderBy: { createdAt: "desc" },
    })) as PathwayProps[];

    const progressByPathway = async () => await Promise.all(pathways.map(async pathway => {
      const pathwayCourses = await getPathwayCourses({ userId, pathwayId: pathway.id });

      let totalProgress = 0
      for (const course of pathwayCourses) totalProgress += course.progress ?? 0

      const averageProgress = pathwayCourses.length > 0 ? totalProgress / pathwayCourses.length : 0

      return { pathwayId: pathway.id, pathwayName: pathway.title, totalCourses: pathwayCourses.length, totalProgress: averageProgress}
    }))

    const pathwaysWithProgress = await progressByPathway()

    for (const pathway of pathways) {
      const progressAndCourses = pathwaysWithProgress.find(
        (pway) => pway.pathwayId === pathway.id
      );
      pathway["progress"] = progressAndCourses?.totalProgress;
      pathway["courseCount"] = progressAndCourses?.totalCourses;
    }

    return pathways
  } catch (error) {
    console.error("Error fetching progress by pathway", error);
    throw error;
  }
}
