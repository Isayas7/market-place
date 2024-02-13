"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SidebarLink = ({ list, isCollapsed }) => {
  const path = usePathname();
  return (
    <Link
      href={list.path}
      className={`flex gap-3 items-center hover:bg-hovered   p-3 my-1 rounded-xl ${
        path == list.path
          ? "bg-active text-active-foreground hover:text-active-foreground  hover:bg-active "
          : ""
      }`}
    >
      <div className={` ${isCollapsed ? "text-xl" : ""}`}>{list.icon}</div>

      <div className={` ${isCollapsed ? "hidden" : "block"}`}>
        {list.titile}
      </div>
    </Link>
  );
};

export default SidebarLink;
