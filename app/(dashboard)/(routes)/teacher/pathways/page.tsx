import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { isTeacher } from "@/lib/teacher";

export default async function CoursesPage() {
  const { userId } = auth();
  
  if (!userId || !isTeacher(userId)) return redirect("/");

  const pathways = await db.pathway.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });

  return (
    <div className="p-6">
      <DataTable columns={columns} data={pathways} />
    </div>
  );
}
