"use client";
import { usePathname } from "next/navigation";
import React from "react";

const Main = ({ children }) => {
  const currentUrl = usePathname().split("/")[1];

  return (
    <main
      className={` ${
        currentUrl.includes("dashboard") ? "" : "container mx-auto pt-28 pb-5"
      } `}
    >
      {children}
    </main>
  );
};

export default Main;
