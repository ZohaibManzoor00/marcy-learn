"use client";

import { usePathname } from "next/navigation";
import { Layout, Compass, BarChart, Rocket, Users, BookText } from "lucide-react";

import SidebarItem from "./sidebar-items";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Rocket,
    label: "Pathways",
    href: "/pathways",
  },
  {
    icon: Users,
    label: "About",
    href: "/about",
  },
];

const teacherRoutes = [
  {
    icon: BookText,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: Users,
    label: "Pathways",
    href: "/teacher/pathways",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

export default function SidebarRoutes() {
  const pathname = usePathname();
  const isTeacherPage = pathname?.includes("/teacher");
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          href={route.href}
          label={route.label}
        />
      ))}
    </div>
  );
}
