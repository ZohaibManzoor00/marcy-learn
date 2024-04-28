import { db } from "@/lib/db";

const today = new Date();
const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
const thisWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

export async function getAppStats() {
  try {
    // use promise all 
    const userStats = await countDistinctUsersWithAnyProgress();
    const totalCourses = await countTotalPublishedCourses();
    const totalCoursesIP = await countTotalCoursesInProgress();
    const totalCoursesCompleted = await countTotalCoursesCompleted();

    return {
      userStats,
      totalCourses,
      totalCoursesIP,
      totalCoursesCompleted,
    };

  } catch (err) {
    return {
      userStats: { totalUsers: 0, change: 0 },
      totalCourses: { allCourses: 0, change: 0 },
      totalCoursesIP: { totalCoursesInProgress: 0, change: 0 },
      countTotalCoursesCompleted: 0,
    };
  }
}

async function countDistinctUsersWithAnyProgress() {
  const users = await db.userProgress.groupBy({
    by: ["userId"], _count: { userId: true },
  });

  if (!users) return { totalUsers: 0, change: 0 }

  const newUsersLastMonth = await db.userProgress.groupBy({
    by: ["userId"],
    where: { updatedAt: { gte: lastMonth, lt: today } },
    _count: { userId: true },
  });

  const totalUsers = users.length;
  const usersLastMonth = newUsersLastMonth.length;

  return { totalUsers, change: usersLastMonth };
}

async function countTotalPublishedCourses() {
  const courses = await db.course.findMany({ where: { isPublished: true } });

  if (!courses) return { allCourses: 0, change: 0 }

  const coursesLastFewMonths = await db.course.findMany({ where: { isPublished: true, createdAt: { gte: threeMonthsAgo, lt: today } } });

  const allCourses = courses.length 
  const totalCoursesLastFewMonths = coursesLastFewMonths.length 
  const changeInPastMonth = +((totalCoursesLastFewMonths / allCourses) * 100).toFixed(0);

  return { allCourses, change: changeInPastMonth };
}

async function countTotalCoursesInProgress() {
  const totalCoursesInProgress = await db.course.count({
    where: {
      chapters: { some: { userProgress: { some: { isCompleted: false } } } },
    },
  });

  const totalCoursesIPThisWeek = await db.course.count({
    where: {
      chapters: { some: { userProgress: { some: { isCompleted: false, updatedAt: { gte: thisWeek, lt: today } } } } },
    },
  });

  const changeInPastWeek = +((totalCoursesIPThisWeek / totalCoursesInProgress) * 100).toFixed(0)

  return { totalCoursesInProgress, change: changeInPastWeek };
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
