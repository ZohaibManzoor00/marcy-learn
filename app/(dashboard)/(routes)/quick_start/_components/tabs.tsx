import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CarouselGroup } from "@/components/carousel";
import Image from "next/image";

const learnerSteps = [
  {
    title: "Search for a Pathway",
    description: "Select a pathway or request one to be made",
  },
  {
    title: "Check out a Course",
    description:
      "Browse through the available courses. They are organized in a recommended sequence, so it's best to complete them in the order shown.",
  },
  {
    title: "Begin the course",
    description:
      "Track your progress and maximize your learning experience with an HD video player",
  },
  {
    title: "Mark chapters as completed",
    description:
      "Effortlessly track your progress by toggling chapters as completed. Once you finish a video, the chapter will automatically be marked as completed, advancing you to the next chapter of the course.",
  },
];

export function RoleTabs() {
  const testImg = "/pathwaysView.png";
  return (
    <Tabs defaultValue="learner">
      <TabsList>
        <TabsTrigger value="learner">Learner</TabsTrigger>
        <TabsTrigger value="teacher">Teacher</TabsTrigger>
      </TabsList>
      <TabsContent value="learner">
        <Card>
          <CardHeader>
            <div className="text-center">
              <CardTitle>Navigate as a Learner</CardTitle>
              <CardDescription>
                Explore pathways, courses, and chapters
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="ml-auto">
              {learnerSteps.map((step, idx) => (
                <div className="mb-4" key={idx}>
                  <div>
                    <h1 className="font-semibold">
                      {idx + 1}. {step.title}
                    </h1>
                    <Image
                      src={testImg}
                      height={500}
                      width={500}
                      alt={`${step.title} image`}
                    />
                    <CardDescription>{step.description}</CardDescription>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* <CarouselGroup /> */}
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
