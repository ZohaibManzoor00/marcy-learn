import { getAppStats } from "@/actions/get-app-stats";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Header from "./_components/header";
import Stepped from "./_components/stepped";
import Stats from "./_components/stats";
import { Timeline } from "./_components/timeline";

export default async function Pathways() {
  const { userId } = auth();

  if (!userId) return redirect("/");

  const {
    totalUsers,
    totalPathways,
    totalCourses,
    totalCoursesIP,
    totalCoursesCompleted,
  } = await getAppStats();

  return (
    <>
      <Stats
        totalUsers={totalUsers}
        totalCourses={totalCourses}
        totalCoursesIP={totalCoursesIP}
        totalCoursesCompleted={totalCoursesCompleted || 0}
      />

     
    </>
  );
}
