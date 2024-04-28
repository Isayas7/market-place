"use client";
import { usePathname } from "next/navigation";
import React from "react";

const Main = ({ children }) => {
  const currentUrl = usePathname();

  return (
    <main
      className={`${
        currentUrl === "/"
          ? "container h-full"
          : currentUrl.includes("dashboard") || currentUrl === "/chat"
          ? ""
          : "container h-full pt-10 pb-5"
      }${
        currentUrl !== "/" &&
        !currentUrl.includes("dashboard") &&
        currentUrl !== "/chat"
          ? "pt-10 pb-5"
          : ""
      }`}
    >
      {children}
    </main>
  );
};

export default Main;
