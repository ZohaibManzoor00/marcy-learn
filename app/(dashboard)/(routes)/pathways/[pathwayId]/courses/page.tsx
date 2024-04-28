import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getPathwayCourses } from "@/actions/get-pathway-courses";
import { db } from "@/lib/db";

import SearchInput from "@/components/search-input";
import { CoursesList } from "@/components/courses-list";
import Categories from "@/components/categories";


interface PathwaysCoursesProps {
  searchParams: { title: string };
  params: { pathwayId: string };
}

export default async function PathwayCourses({ searchParams, params }: PathwaysCoursesProps) {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const coursesInPathway = await getPathwayCourses({ userId, ...searchParams, ...params });
  const categories = await db.category.findMany({ orderBy: { name: "asc" } });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={coursesInPathway} />
      </div>
    </>
  );
}
