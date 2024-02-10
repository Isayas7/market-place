"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SidebarLink = ({ list }) => {
  const path = usePathname();
  return (
    <Link
      href={list.path}
      className={`flex gap-3 items-center hover:bg-hovered hover:text-foreground  p-3 my-1 rounded-xl ${
        path == list.path ? "bg-active" : ""
      }`}
    >
      {list.icon}
      {list.titile}
    </Link>
  );
};

export default SidebarLink;
