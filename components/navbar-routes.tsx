"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import DarkModeToggler from "./dark-mode-toggler";
import SearchInput from "./search-input";
import { isTeacher } from "@/lib/teacher";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function NavbarRoutes() {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isPathwayPage = pathname?.startsWith("/pathways");
  const isDashboard = pathname === "/";

  const { theme } = useTheme() 

  return (
    <>
      {(isPathwayPage || isDashboard) && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button className="sm" variant="ghost">
              <LogOut className="h-4 mr-2 w-4" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button className="sm" variant="ghost">
              Teacher Mode
            </Button>
          </Link>
        ) : null}
        <DarkModeToggler />
        <div className="mt-1">
          <UserButton
            appearance={{ baseTheme: theme === "dark" ? dark : undefined }}
            afterSignOutUrl="/"
          />
        </div>
      </div>
    </>
  );
}
