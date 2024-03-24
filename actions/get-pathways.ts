import { db } from "@/lib/db";
import { getPathwayCourses } from "./get-pathway-courses";

export async function getProgressByPathway(userId: string) {
  try {
    const pathways = await db.pathway.findMany({ include: { courses: true, } });

    const progressByPathway = await Promise.all(pathways.map(async pathway => {
      const pathwayCourses = await getPathwayCourses({ userId, pathwayId: pathway.id });
      let totalProgress = 0
      for (const course of pathwayCourses) totalProgress += course.progress ?? 0
      const averageProgress = pathwayCourses.length > 0 ? totalProgress / pathwayCourses.length : 0
      return { pathwayId: pathway.id, pathwayName: pathway.title, totalCourses: pathwayCourses.length, totalProgress: averageProgress}
    }))

    return progressByPathway;
  } catch (error) {
    console.error("Error fetching progress by pathway:", error);
    throw error;
  }
}
