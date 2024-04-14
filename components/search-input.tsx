"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

export default function SearchInput() {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl(
      { url: pathname, query: { categoryId: currentCategoryId, title: debouncedValue } },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  }, [debouncedValue, currentCategoryId, router, pathname]);

  const getPlaceholder = (pathname: string) => {
    const isPathwaysPage = pathname === "/pathways"
    if (isPathwaysPage) return "Search for a pathway...";

    const isCoursePage = pathname?.startsWith('/pathways') && pathname?.endsWith('/courses')
    if (isCoursePage) return "Search for a course..."
    
    return "Search for a course..."
  };

  return (
    <div className="relative">
      <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600 dark:text-gray-300" />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 dark:bg-slate-800"
        placeholder={getPlaceholder(pathname)}
      />
    </div>
  );
}
