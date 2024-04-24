import { db } from "@/lib/db";
import { getProgress } from "./get-progress";

const getGlobalCourseProgressStats = async () => {
  const courses = await db.course.findMany({
    // use user Id 
    include: { chapters: { include: { userProgress: true } } }
  });

  let totalComplete = 0, totalInProgress = 0 

  const chartData = courses.map(course => {
    const usersInProgress = new Set<string>();
    const usersCompleted = new Set<string>();

    course.chapters.forEach(chapter => {
      // Determine the unique users who have completed this chapter
      const completedUsersForChapter = chapter.userProgress
        .filter(progress => progress.isCompleted)
        .map(progress => progress.userId);

      // Add users who have completed this chapter to the completed set
      completedUsersForChapter.forEach(userId => usersCompleted.add(userId));

      // Add to inProgress only if the user has not completed the entire course
      chapter.userProgress.forEach(progress => {
        if (!usersCompleted.has(progress.userId)) {
          usersInProgress.add(progress.userId);
        }
      });
    });

    // Construct the data object
    totalComplete += usersCompleted.size 
    totalInProgress += usersInProgress.size 

    return {
      name: course.title,  // Include the title directly as it is part of the course model
      totalComplete: usersCompleted.size,
      totalInProgress: usersInProgress.size
    };
  });


  return { data: chartData, totalComplete, totalInProgress };
};

export const getAnalytics = async () => {
  try {
    return await getGlobalCourseProgressStats();
  } catch (err) {
    console.error("[GET_GLOBAL_COURSE_PROGRESS_STATS]", err);
    return { data: [], totalComplete: [], totalInProgress: [] };
  }
};
