import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Pathways() {
  const { userId } = auth();
  
  if (!userId) return redirect("/");

  // const pathwaysWithProgress = await getProgressByPathway({ userId, searchParams });

  // Total Users 
  // Total Pathways Available
  // Total Course Available 
  // Total Courses Completed 
  // Total Courses In Progress 
  // Most Popular Course 

  return (
    <>
    </>
  );
}
