import { ProgressBar } from "@/components/progress-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, BookOpenCheck, BookCopy } from "lucide-react";

interface StatsProps {
  userStats: { totalUsers: number; change: number };
  totalCourses: { allCourses: number; change: number };
  totalCoursesIP: { totalCoursesInProgress: number; change: number };
  totalCoursesCompleted: number;
}

export default function Stats({
  userStats,
  totalCourses,
  totalCoursesIP,
  totalCoursesCompleted,
}: StatsProps) {
  const stats = [
    {
      name: "Learners",
      value: `${userStats.totalUsers}+`,
      change: `+${userStats.change} this month`,
      icon: Users,
    },
    {
      name: "Available courses",
      value: `${totalCourses.allCourses}`,
      icon: BookCopy,
      change: `+${totalCourses.change}% past few months`,
    },
    {
      name:
        totalCoursesIP.totalCoursesInProgress === 1
          ? "Course in progress"
          : "Courses in progress",
      value: totalCoursesIP.totalCoursesInProgress,
      icon: Activity,
      change: `+${totalCoursesIP.change}% this week`,
    },
    {
      name: "Completed courses",
      value: totalCoursesCompleted,
      icon: BookOpenCheck,
      change: `Make it ${totalCoursesCompleted + 1}!`,
    },
  ];

  const percentCompleted =
    (totalCoursesCompleted / totalCourses.allCourses) * 100;

  return (
    <div className="grid gap-4 grid-cols-2 md:gap-8 lg:grid-cols-4">
      {stats.map(({ name, value, change, icon: Icon }, idx) => (
        <Card key={idx} x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{name}</CardTitle>
            <Icon className="h-4 w-4 text-zinc-700 dark:text-gray-200 hover:animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            {idx < stats.length - 1 ? (
              <>
                <p className="text-xs text-muted-foreground">{change}</p>{" "}
              </>
            ) : (
              <div className="flex gap-2 items-center">
                <ProgressBar
                  value={percentCompleted}
                  variant="success"
                  className="w-11/12"
                />
                <p className="text-xs text-muted-foreground">
                  {percentCompleted.toFixed(0)}%
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
