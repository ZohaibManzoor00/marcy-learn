"use client";

import { usePathname } from "next/navigation";
import {
  Layout,
  BarChart,
  Rocket,
  Users,
  BookText,
  Sparkles,
  Shapes,
} from "lucide-react";

import SidebarItem from "./sidebar-items";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Shapes,
    label: "Pathways",
    href: "/pathways",
  },
  {
    icon: Rocket,
    label: "Quick Start",
    href: "/quick_start",
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
