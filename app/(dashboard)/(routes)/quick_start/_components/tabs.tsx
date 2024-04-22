import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function RoleTabs() {
  return (
    <Tabs defaultValue="learner">
      <TabsList>
        <TabsTrigger value="learner">Learner</TabsTrigger>
        <TabsTrigger value="teacher">Teacher</TabsTrigger>
      </TabsList>
      <TabsContent value="learner">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Watch Courses</CardTitle>
            <CardDescription>
              Track your progress as you take on courses to expand your
              learning.
            </CardDescription>
          </CardHeader>
          <CardContent>Hi</CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="teacher">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Create Courses</CardTitle>
            <CardDescription>
              Track your progress as you take on courses to expand your
              learning.
            </CardDescription>
          </CardHeader>
          <CardContent>Hi</CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
