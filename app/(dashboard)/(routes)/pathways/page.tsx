import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getProgressByPathway } from "@/actions/get-pathways";
import SearchInput from "@/components/search-input";
import { PathwaysList } from "./_components/pathways-list";

interface SearchProps {
  searchParams: { title: string; categoryId: string };
}

export default async function Pathways({ searchParams }: SearchProps) {
  const { userId } = auth();
  
  if (!userId) return redirect("/");

  const pathwaysWithProgress = await getProgressByPathway({ userId, searchParams });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <PathwaysList items={pathwaysWithProgress} />
      </div>
    </>
  );
}
