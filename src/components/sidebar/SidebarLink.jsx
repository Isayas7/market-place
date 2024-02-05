"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SidebarLink = ({ list }) => {
  const path = usePathname();
  return (
    <Link
      href={list.path}
      className={`flex gap-3 items-center dark:hover:bg-dark_tint hover:bg-light_tint  p-3 my-1 rounded-xl ${
        path == list.path ? "dark:bg-dark_tint_active bg-light_tint_active" : ""
      }`}
    >
      {list.icon}
      {list.titile}
    </Link>
  );
};

export default SidebarLink;
