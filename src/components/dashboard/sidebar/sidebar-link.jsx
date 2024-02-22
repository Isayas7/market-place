"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SidebarLink = ({ list, isCollapsed }) => {
  const path = usePathname();
  
  return (
    <Link
      href={list.path}
      className={`flex gap-3 items-center  pl-5 p-3 my-1 rounded-xl ${
        path == list.path
          ? "bg-active  text-jade hover:bg-active-hovered "
          : "hover:bg-hovered  text-palesky "
      } ${isCollapsed ? "w-[90%]" : "w-[90%]"}`}
    >
      <div className={` ${isCollapsed ? "text-xl" : ""}`}>{list.icon}</div>

      <div
        className={`whitespace-nowrap ${isCollapsed ? "lg:hidden" : "block"}`}
      >
        {list.title}
      </div>
    </Link>
  );
};

export default SidebarLink;
