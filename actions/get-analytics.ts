import { db } from "@/lib/db";
import { Course } from "@prisma/client";

const groupByCourse = (courses: Course[]) => {
  const grouped: { [courseTitle: string]: number } = {};

  courses.forEach((course) => {
    const courseTitle = course.title;
    if (!grouped[courseTitle]) grouped[courseTitle] = 0;
    // grouped[courseTitle] += course.price!;
  });

  return grouped;
};

export const getAnalytics = async (userId: string) => {
  try {
    const courses = await db.course.findMany({ where: { userId } });
    const groupedEarnings = groupByCourse(courses);
    const data = Object.entries(groupedEarnings).map(
      ([courseTitle, total]) => ({
        name: courseTitle,
        total,
      })
    );
    const totalRevenue = data.reduce((acc, cur) => acc + cur.total, 0);
    const totalSales = courses.length;

    return { data, totalRevenue, totalSales };
  } catch (err) {
    console.log("[GET_ANALYTICS]", err);
    return { data: [], totalRevenue: 0, totalSales: 0 };
  }
};
