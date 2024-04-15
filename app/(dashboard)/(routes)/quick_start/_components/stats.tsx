interface StatsProps {
  totalUsers: number;
  totalCourses: number;
  totalCoursesIP: number;
  totalCoursesCompleted: number;
}

export default function Stats({
  totalUsers,
  totalCourses,
  totalCoursesIP,
  totalCoursesCompleted,
}: StatsProps) {
  const stats = [
    { id: 1, name: "Learners on the platform", value: `${totalUsers}+` },
    { id: 2, name: "Courses available", value: `${totalCourses}` },
    { id: 3, name: totalCoursesIP === 1 ? "Course in progress" : "Courses in progress", value: totalCoursesIP },
    { id: 4, name: "Courses completed", value: totalCoursesCompleted },
  ];

  return (
    <div className="bg-white dark:bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
              Trusted by your peers
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Lorem ipsum dolor sit amet consect adipisicing possimus.
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-gray-400/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-300">
                  {stat.name}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
