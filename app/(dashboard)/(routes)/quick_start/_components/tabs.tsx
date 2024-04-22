import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const learnerSteps = [
  {
    title: "Search for a Pathway",
    description: "Choose a pathway covered at Marcy or request one to be made!",
  },
  {
    title: "Check out a Course",
    description:
      "Browse for a course! Courses are ordered therefore its highly suggested you complete them in the intended order.",
  },
  {
    title: "Begin the course",
    description:
      "With a progress tracker and an HD video player, unlock the possibilities of your growth.",
  },
];

export function RoleTabs() {
  return (
    <Tabs defaultValue="learner">
      <TabsList>
        <TabsTrigger value="learner">Learner</TabsTrigger>
        <TabsTrigger value="teacher">Teacher</TabsTrigger>
      </TabsList>
      <TabsContent value="learner">
        <div className="flex">
          <Card className="w-2/6">
            <CardHeader>
              <CardTitle>Navigate as a Learner</CardTitle>
              <CardDescription>
                Navigate pathways, courses, and chapters
              </CardDescription>
            </CardHeader>
            <CardContent>
              {learnerSteps.map((step, idx) => (
                <div className="mb-4">
                  <h1 className="font-semibold">
                    {idx + 1}. {step.title}
                  </h1>
                  <CardDescription>{step.description}</CardDescription>
                </div>
              ))}
            </CardContent>
          </Card>
          <Image
            src="/pathwaysView.png"
            className="w-4/6"
            alt="pathwaysView"
            width={1000}
            height={1000}
          />
        </div>
      </TabsContent>
      <TabsContent value="teacher">
        <Card className="w-1/2">
          <CardHeader>
            <CardTitle>Create Courses</CardTitle>
            <CardDescription>
              Track your progress as you take on courses to expand your
              learning.
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
