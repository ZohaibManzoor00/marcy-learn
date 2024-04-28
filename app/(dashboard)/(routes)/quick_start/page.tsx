import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { RoleTabs } from "./_components/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getAppStats } from "@/actions/get-app-stats";
import Stats from "./_components/stats";

const pages = [
  {
    name: "Pathways",
    src: "/pathwaysView.png",
  },
  {
    name: "Courses",
    src: "/courseView.png",
  },
  {
    name: "Chapters",
    src: "/chapterView.png",
  },
  {
    name: "Dashboard",
    src: "/dashboardView.png",
  },
];

export default async function QuickStart() {
  const { userId } = auth();

  if (!userId) return redirect("/");

  const {
    userStats,
    totalCourses,
    totalCoursesIP,
    totalCoursesCompleted,
  } = await getAppStats();
  // console.log({totalCoursesCompleted, totalCoursesIP})

  return (
    <div className="p-4">
      <Stats
        userStats={userStats}
        totalCourses={totalCourses}
        totalCoursesIP={totalCoursesIP}
        totalCoursesCompleted={totalCoursesCompleted || 0}
      />
      <div className="mt-4">
        <RoleTabs />
      </div>
      <div className="mt-4">
        <Tabs defaultValue="dark-mode" className="">
          <TabsList className="mt-3">
            <TabsTrigger value="dark-mode">Dark Mode</TabsTrigger>
            <TabsTrigger value="light-mode">Light Mode</TabsTrigger>
          </TabsList>
          <TabsContent value="dark-mode">
            <Card className="max-w-screen-sm">
              <CardContent className="mt-5">
                <div className="">
                  <div className="h-[300px] w-[500px] bg-slate-900"></div>
                </div>
                {/* tabs with page views with dark */}
                <Tabs className="flex justify-center">
                  <TabsList className="mt-3">
                    {pages.map((page) => (
                      <TabsTrigger
                        key={page.name}
                        value={page.name.toLowerCase()}
                      >
                        {page.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="light-mode">
            <CardContent className="">
              <div className="">
                <div className="h-[300px] w-[500px] bg-slate-300"></div>
              </div>
              {/* tabs with page views with dark */}
            </CardContent>
          </TabsContent>
        </Tabs>
      </div>
      <div className="py-10"></div>

      {/* <div className="pb-20 flex justify-center px-20">
    </div> */}
      {/* <CarouselGroup /> */}
    </div>
  );
}
