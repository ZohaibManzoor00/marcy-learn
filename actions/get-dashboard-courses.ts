import { db } from "@/lib/db";
import { Category, Chapter, Course, UserProgress } from "@prisma/client";
import { getProgress } from "@/actions/get-progress";

type CourseWithProgressWithCategory = Course & {
  category: Category;
  chapters: (Chapter & { userProgress: UserProgress[] })[];
  progress: number | null;
};

type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[];
  coursesInProgress: CourseWithProgressWithCategory[];
};

export const getDashboardCourses = async (
  userId: string, 
  title?: string, 
  categoryId?: string
): Promise<DashboardCourses> => {
  try {
    const coursesInProgress = await db.course.findMany({
      where: {
        chapters: { some: { userProgress: { some: { userId, isCompleted: true } }, isPublished: true } },
        title: { contains: title }, 
        categoryId
      },
      include: {
        category: true,
        chapters: { where: { isPublished: true }, include: { userProgress: { where: { userId } } } },
      },
    });

    const coursesWithProgress = await Promise.all(coursesInProgress.map(async (course) => {
        const progress = await getProgress(userId, course.id);
        return { ...course, progress } as CourseWithProgressWithCategory;
      })
    );

    const completedCourses = coursesWithProgress.filter(course => course.progress === 100);
    const coursesInProgressFiltered = coursesWithProgress.filter(course => course.progress! < 100);

    return { completedCourses, coursesInProgress: coursesInProgressFiltered };
  } catch (err) {
    console.log("[GET_DASHBOARD_COURSES_WITH_PROGRESS]", err);
    return { completedCourses: [], coursesInProgress: [] };
  }
};
