"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({ list }) => {
  const path = usePathname();
  return (
    <Link
      href={list.path}
      className={`w-[90%] flex gap-3 items-center  px-5 py-3 my-1 justify-center xl:justify-normal  rounded-xl ${
        path == list.path
          ? "bg-active  text-jade hover:bg-active-hovered "
          : "hover:bg-hovered  text-palesky "
      } `}
    >
      <div>{list.icon}</div>

      <div className={`whitespace-nowrap`}>{list.title}</div>
    </Link>
  );
};

export default NavLink;
