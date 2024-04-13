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

  // const pathwaysWithProgress = await getProgressByPathway({ userId, searchParams });

  return (
    <>
      About us 
    </>
  );
}
