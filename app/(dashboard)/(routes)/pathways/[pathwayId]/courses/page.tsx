import { getPathwayCourses } from "@/actions/get-pathway-courses";
import SearchInput from "@/components/search-input";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { PathwaysList } from "../../_components/pathways-list";
import { CoursesList } from "@/components/courses-list";

interface PathwaysCoursesProps {
  params: { pathwayId: string };
}

export default async function PathwayCourses({ params }: PathwaysCoursesProps) {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const coursesInPathway = await getPathwayCourses({ userId, ...params });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        {/* CLEAN UP SEARCH INPUT */}
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        {/* <Categories items={categories} /> */}
        <CoursesList items={coursesInPathway} />
      </div>
    </>
  );
}
