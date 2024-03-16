"use client";

import { Category } from "@prisma/client";
import { IconType } from "react-icons";
import { LuHardDriveUpload } from "react-icons/lu";
import { LiaTerminalSolid } from "react-icons/lia";
import { RiJavascriptLine } from "react-icons/ri";
import { CgWebsite } from "react-icons/cg";
import { DiJavascript1 } from "react-icons/di";
import { MdDataObject } from "react-icons/md";
import { SiThealgorithms } from "react-icons/si";
import { BiLogoReact } from "react-icons/bi";
import { AiOutlineConsoleSql } from "react-icons/ai";
import { BiServer } from "react-icons/bi";

import CategoryItem from "./category.item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  "Mod 0": LiaTerminalSolid,
  "Mod 1": RiJavascriptLine,
  "Mod 2": CgWebsite,
  "Mod 3": DiJavascript1,
  "Mod 4": LuHardDriveUpload,
  "Mod 5": MdDataObject,
  "Mod 6": SiThealgorithms,
  "Mod 7": BiLogoReact,
  "Mod 8": AiOutlineConsoleSql,
  "Mod 9": BiServer,
};

export default function Categories({ items }: CategoriesProps) {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2 ">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
}
