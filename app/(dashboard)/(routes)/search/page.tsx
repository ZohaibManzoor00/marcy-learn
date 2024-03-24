import { redirect } from "next/navigation";
import SearchInput from "@/components/search-input";

interface SearchPageProps {
  searchParams: { title: string; categoryId: string };
}

export default async function Search({ searchParams }: SearchPageProps) {
  return redirect('/')

  const categories = await db.category.findMany({ orderBy: { name: "asc" } });

  // const courses = await getCourses({ userId, ...searchParams });


  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        SEARCH
        {/* <Categories items={categories} />
        <CoursesList items={courses} /> */}
      </div>
    </>
  );
}
