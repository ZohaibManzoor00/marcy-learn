import { db } from "@/lib/db";

export async function getAppStats() {
  try {
    const totalUsers = await countDistinctUsersWithAnyProgress();
    const totalPathways = await countTotalPublishedPathways();
    const totalCourses = await countTotalPublishedCourses();
    const totalCoursesIP = await countTotalCoursesInProgress();
    const totalCoursesCompleted = await countTotalCoursesCompleted();
    return {
      totalUsers,
      totalPathways,
      totalCourses,
      totalCoursesIP,
      totalCoursesCompleted,
    };
  } catch (err) {
    return {
      totalUsers: 0,
      totalPathways: 0,
      totalCourses: 0,
      totalCoursesIP: 0,
      countTotalCoursesCompleted: 0,
    };
  }
}

async function countDistinctUsersWithAnyProgress() {
  const users = await db.userProgress.groupBy({
    by: ["userId"],
    _count: {
      userId: true,
    },
  });

  return users.length;
}

async function countTotalPublishedPathways() {
  const pathways = await db.pathway.groupBy({
    by: ["id"],
    where: { isPublished: true },
  });

  return pathways.length;
}

async function countTotalPublishedCourses() {
  const courses = await db.course.findMany({ where: { isPublished: true } });
  return courses.length;
}

async function countTotalCoursesInProgress() {
  const totalCoursesInProgress = await db.course.count({
    where: {
      chapters: { some: { userProgress: { some: { isCompleted: false } } } },
    },
  });

  return totalCoursesInProgress;
}

async function countTotalCoursesCompleted() {
  const chaptersWithCompletion = await db.chapter.findMany({
    include: { userProgress: true, course: true },
  });

  const userCourseCompletions = new Map();

  chaptersWithCompletion.forEach((chapter) => {
    chapter.userProgress.forEach((progress) => {
      if (progress.isCompleted) {
        const userCourseKey = `${progress.userId}-${chapter.courseId}`;
        if (userCourseCompletions.has(userCourseKey)) {
          userCourseCompletions.get(userCourseKey).add(chapter.id);
        } else {
          userCourseCompletions.set(userCourseKey, new Set([chapter.id]));
        }
      }
    });
  });

  let totalFullyCompleted = 0;
  userCourseCompletions.forEach((completedChapters, userCourseKey) => {
    const courseId = userCourseKey.split("-")[1];
    const courseChapters = chaptersWithCompletion
      .filter((ch) => ch.courseId === courseId)
      .map((ch) => ch.id);
    if (courseChapters.every((chId) => completedChapters.has(chId))) {
      totalFullyCompleted++;
    }
  });

  return totalFullyCompleted;
}
