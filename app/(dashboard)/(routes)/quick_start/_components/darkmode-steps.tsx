import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const generalInfo = [
  {
    title: "Dashboard",
    description: "Track your progress and come back to a course in no time.",
  },
  {
    title: "Dark Mode",
    description: "Change the theme to your preference!",
  },
];

export default function DarkModeSteps() {
  return <div>DarkModeSteps</div>;
}

export function RoleTabs() {
  return (
    <Tabs defaultValue="dark-mode">
      <TabsList>
        <TabsTrigger value="dark-mode">Dark Mode</TabsTrigger>
        <TabsTrigger value="light-mode">Light Mode</TabsTrigger>
      </TabsList>
      <TabsContent value="dark-mode">
        <div className="flex">
          <Card className="w-2/6">
            <CardHeader>
              <CardTitle>Navigate as a Dark Mode</CardTitle>
              <CardDescription>
                Navigate pathways, courses, and chapters
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generalInfo.map((step, idx) => (
                <div className="mb-4" key={idx}>
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
      <TabsContent value="light-mode">
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
