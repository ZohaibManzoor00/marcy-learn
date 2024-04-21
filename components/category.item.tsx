"use client";

import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";

interface CategoryItemProps {
  label: string;
  value?: string;
  icon?: IconType;
}

export default function CategoryItem({
  label,
  value,
  icon: Icon,
}: CategoryItemProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: { title: currentTitle, categoryId: isSelected ? null : value },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "py-2 px-3 text-sm border border-slate-200 rounded-md flex items-center gap-x-1 hover:bg-sky-200/20 dark:border-slate-800 transition",
        isSelected && "bg-sky-200/20 border-slate-300"
      )}
      typeof="button"
    >
      {Icon && <Icon size={20} />}
      <p className={cn("font-semibold text-xs", isSelected && "text-sky-800 dark:text-sky-200")}>
        {label}
      </p>
    </button>
  );
}
