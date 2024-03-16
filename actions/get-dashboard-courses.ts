// import { db } from "@/lib/db";
// import { Category, Chapter, Course } from "@prisma/client";
// import { getProgress } from "@/actions/get-progress";

// type CourseWithProgressWithCategory = Course & {
//   category: Category;
//   chapters: Chapter[];
//   progress: number | null;
// };

// type DashboardCourses = {
//   completedCourses: CourseWithProgressWithCategory[];
//   coursesInProgress: CourseWithProgressWithCategory[];
// };

// export const getDashboardCourses = async (
//   userId: string
// ): Promise<DashboardCourses> => {
//   try {

//     const coursesInProgress = await db.course.findMany({
//       where: {
//         chapters: {
//           some: {
//             userProgress: {
//               some: {
//                 userId, // Replace with the actual user ID
//                 OR: [
//                   { isCompleted: true },
//                   { isCompleted: false }
//                 ]
//               }
//             }
//           }
//         }
//       },
//       include: {
//         category: true, // If you want to include category details
//         chapters: {
//           include: {
//             userProgress: {
//               where: {
//                 userId, // Ensure we only include progress for the specific user
//               }
//             },
//             // Include any other nested relations you need, like MuxData
//           }
//         },
//       }
//     });

//     for (const course of coursesInProgress) course['progress'] = true

//     const courses = coursesInProgress.map(course => course) as CourseWithProgressWithCategory[]

//     for (const course of courses) {
//       const progress = await getProgress(userId, course.id)
//       course['progress'] = progress
//     }

//     return { completedCourses, coursesInProgress };
//     // -------------REAL-------------

//     // const userCourses = await db.course.findMany({
//     //   where: { userId },
//     //   include: { category: true, chapters: { where: { isPublished: true } } },
//     // });

//     // const courses = userCourses.map(
//     //   (course) => course
//     // ) as CourseWithProgressWithCategory[];

//     // for (const course of courses) {
//     //   const progress = await getProgress(userId, course.id);
//     //   course["progress"] = progress;
//     // }

//     // const completedCourses = courses.filter(
//     //   (course) => course.progress === 100
//     // );
//     // const coursesInProgress = courses.filter(
//     //   (course) => (course.progress ?? 0) < 100
//     // );

//     // return { completedCourses, coursesInProgress}
//   } catch (err) {
//     console.log("[GET_DASHBOARD_COURSES]", err);
//     return { completedCourses: [], coursesInProgress: [] };
//   }
// };

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
  userId: string
): Promise<DashboardCourses> => {
  try {
    const coursesInProgress = await db.course.findMany({
      where: { chapters: { some: { userProgress: { some: { userId } } } } },
      include: {
        category: true,
        chapters: { include: { userProgress: { where: { userId } } } },
      },
    });

    const coursesWithProgress = await Promise.all(
      coursesInProgress.map(async (course) => {
        const progress = await getProgress(userId, course.id);
        return { ...course, progress } as CourseWithProgressWithCategory;
      })
    );

    const completedCourses = coursesWithProgress.filter(
      (course) => course.progress === 100
    );
    const coursesInProgressFiltered = coursesWithProgress.filter(
      (course) => course.progress! < 100
    );
    return { completedCourses, coursesInProgress: coursesInProgressFiltered };
  } catch (err) {
    console.log("[GET_DASHBOARD_COURSES]", err);
    return { completedCourses: [], coursesInProgress: [] };
  }
};
