import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getAnalytics } from "@/actions/get-analytics";
import DataCard from "./_components/data-card";
import Chart from "./_components/chart";
import { isTeacher } from "@/lib/teacher";

export default async function Analytics() {
  const { userId } = auth();
  if (!userId || !isTeacher(userId)) return redirect("/");

  const { data, totalComplete, totalInProgress } = await getAnalytics();
  // console.log({data, totalComplete, totalInProgress})
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard label={"Courses Completed"} value={+totalComplete} />
        <DataCard label={"Courses in Progress"} value={+totalInProgress} />
      </div>
      <Chart data={data} />
    </div>
  );
}
