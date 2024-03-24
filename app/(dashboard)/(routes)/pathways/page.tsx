import SearchInput from "@/components/search-input";
import { db } from "@/lib/db";
import { PathwaysList } from "./_components/pathways-list";

export default async function Pathways() {
  const pathways = await db.pathway.findMany();

  // console.log(pathways);
  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <PathwaysList items={pathways} />
      </div>
    </>
  );
}
