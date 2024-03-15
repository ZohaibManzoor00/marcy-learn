import { db } from "@/lib/db";
import { Category, Chapter, Course } from "@prisma/client";
import { NextResponse } from "next/server";
import { getProgress } from "./get-progress";

type CourseWithProgressWithCategory = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
};

type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[];
  coursesInProgress: CourseWithProgressWithCategory[];
};

export const getDashboardCourses = async (
  userId: string
): Promise<DashboardCourses> => {
  try {
    const userCourses = await db.course.findMany({
      where: { userId },
      include: { category: true, chapters: { where: { isPublished: true } } },
    });

    const courses = userCourses.map(
      (course) => course
    ) as CourseWithProgressWithCategory[];

    for (const course of courses) {
      const progress = await getProgress(userId, course.id);
      course["progress"] = progress;
    }

    const completedCourses = courses.filter(
      (course) => course.progress === 100
    );
    const coursesInProgress = courses.filter(
      (course) => (course.progress ?? 0) < 100
    );

    return { completedCourses, coursesInProgress };
  } catch (err) {
    console.log("[GET_DASHBOARD_COURSES]", err);
    return { completedCourses: [], coursesInProgress: [] };
  }
};
