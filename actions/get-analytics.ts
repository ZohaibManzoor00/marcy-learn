import { db } from "@/lib/db";

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

  courses.forEach((course, courseIndex) => {
    course.chapters.forEach((chapter) => {
      chapter.userProgress.forEach((progress) => {
        const userId = progress.userId;

        if (progress.isCompleted) {
          courseStats[courseIndex].usersCompleted.add(userId);
        } else {
          courseStats[courseIndex].usersInProgress.add(userId);
        }

        if (courseStats[courseIndex].usersCompleted.has(userId)) {
          courseStats[courseIndex].usersInProgress.delete(userId);
        }
      });
    });
  });

  const finalStats = courseStats.map(
    ({ courseTitle, usersCompleted, usersInProgress }) => ({
      name: courseTitle,
      totalComplete: usersCompleted.size,
      totalInProgress: usersInProgress.size,
    })
  );

  const totalComplete = finalStats.reduce(
    (acc, cur) => acc + +cur.totalComplete,
    0
  );
  const totalInProgress = finalStats.reduce(
    (acc, cur) => acc + +cur.totalInProgress,
    0
  );

  return { data: finalStats, totalComplete, totalInProgress };
};

export const getAnalytics = async () => {
  try {
    return await getGlobalCourseProgressStats();
  } catch (err) {
    console.error("[GET_GLOBAL_COURSE_PROGRESS_STATS]", err);
    return { data: [], totalComplete: [], totalInProgress: [] };
  }
};
