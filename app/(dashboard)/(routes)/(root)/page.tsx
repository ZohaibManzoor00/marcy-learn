import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";
import { CheckCircle, Clock } from "lucide-react";
import InfoCard from "./_components/info-card";
import Categories from "@/components/categories";
import { db } from "@/lib/db";

export default async function Dashboard({ searchParams }: { searchParams: { title: string, categoryId: string }, }) {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const { completedCourses, coursesInProgress } = await getDashboardCourses(userId, searchParams?.title, searchParams?.categoryId);
  const categories = await db.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label={"In Progress"}
          numberOfItems={coursesInProgress.length}
          variant="primary"
        />
        <InfoCard
          icon={CheckCircle}
          label={"Completed"}
          numberOfItems={completedCourses.length}
          variant="success"
        />
      </div>
      <Categories items={categories} />
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
}
