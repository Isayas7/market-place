"use client";
import { roleData } from "@/utils/permission";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SidebarLink = ({ list, isCollapsed }) => {
  const path = usePathname();
  let tab;
  if (typeof localStorage !== "undefined") {
    tab = localStorage.getItem("tab");
  }

  return (
    <Link
      href={{
        pathname: `${list.path}`,
        query:
          list.path === "/dashboard/user"
            ? { role: tab || roleData.Buyer }
            : null,
      }}
      onClick={() => {
        list.path === "/dashboard/user"
          ? localStorage.setItem("tab", roleData.Buyer)
          : null;
      }}
      className={`flex gap-3 items-center pl-5 p-3 my-1 rounded-xl ${
        (list.path === "/dashboard" && path === "/dashboard") ||
        (path.includes(list.path) && list.path !== "/dashboard")
          ? "bg-active text-jade hover:bg-active-hovered"
          : "hover:bg-hovered text-palesky"
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
