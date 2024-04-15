import { getAppStats } from "@/actions/get-app-stats";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Header from "./_components/header";
import Stepped from "./_components/stepped";
import Stats from "./_components/stats";
import { Timeline } from "./_components/timeline";
import { CarouselGroup } from "../pathways/_components/carousel";

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

      <div className="pb-20 flex justify-center px-20">
        <CarouselGroup />
      </div>
    </>
  );
}
