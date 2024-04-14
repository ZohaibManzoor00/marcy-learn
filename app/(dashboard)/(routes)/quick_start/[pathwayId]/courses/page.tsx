import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getPathwayCourses } from "@/actions/get-pathway-courses";
import SearchInput from "@/components/search-input";
import { CoursesList } from "@/components/courses-list";

interface PathwaysCoursesProps {
  searchParams: { title: string };
  params: { pathwayId: string };
}

export default async function PathwayCourses({
  searchParams,
  params,
}: PathwaysCoursesProps) {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const coursesInPathway = await getPathwayCourses({ userId, ...searchParams, ...params });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <CoursesList items={coursesInPathway} />
      </div>
    </>
  );
}
