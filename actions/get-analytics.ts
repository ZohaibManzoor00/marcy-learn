import { db } from "@/lib/db";
import { getProgress } from "./get-progress";

const getGlobalCourseProgressStats = async () => {
  const courses = await db.course.findMany({
    include: {
      chapters: {
        include: {
          userProgress: true,
        },
      },
    },
  });

  const courseStats = courses.map((course) => ({
    courseId: course.id,
    courseTitle: course.title,
    usersCompleted: new Set(),
    usersInProgress: new Set(),
  }));

  courses?.forEach(async (course, courseIdx) => {
    // course.chapters.forEach(async (chapter) => {
      const progress = await getProgress(course.userId, course.id)

      if (progress === 100) {
        console.log(courseStats[courseIdx].usersCompleted.add(course.title))
        courseStats[courseIdx].usersCompleted.add(course.title);
      }
      // courseStats[courseIdx].usersCompleted += progress == 100 ? 1 : 0
      // courseStats[courseIdx].usersInProgress += progress != 100 ? 1 : 0 
      // chapter.userProgress.forEach((progress) => {
      //   const userId = progress.userId;

      //   if (progress.isCompleted) {
      //     courseStats[courseIndex].usersCompleted.add(userId);
      //   } else {
      //     courseStats[courseIndex].usersInProgress.add(userId);
      //   }

      //   if (courseStats[courseIndex].usersCompleted.has(userId)) {
      //     courseStats[courseIndex].usersInProgress.delete(userId);
      //   }
      // });
    // });
  });

  console.log('hi', courseStats, 'hi')

  const finalStats = courseStats.map(
    ({ courseTitle, usersCompleted, usersInProgress }) => ({
      name: courseTitle,
      totalComplete: usersCompleted,
      totalInProgress: usersInProgress
    })
  );
  //   console.log(finalStats)
  // const totalComplete = finalStats.reduce(
  //   (acc, cur) => acc + +cur.totalComplete,
  //   0
  // );
  // const totalInProgress = finalStats.reduce(
  //   (acc, cur) => acc + +cur.totalInProgress,
  //   0
  // );

  return { data: [], totalComplete: 9, totalInProgress: 2 };
};

export const getAnalytics = async () => {
  try {
    return await getGlobalCourseProgressStats();
  } catch (err) {
    console.error("[GET_GLOBAL_COURSE_PROGRESS_STATS]", err);
    return { data: [], totalComplete: [], totalInProgress: [] };
  }
};
