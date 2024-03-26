"use client";
import { usePathname } from "next/navigation";
import React from "react";

const Main = ({ children }) => {
  const currentUrl = usePathname();

  return (
    <main
      className={`${
        currentUrl === "/"
          ? "container"
          : currentUrl.includes("dashboard")
          ? ""
          : "container "
      }${
        currentUrl !== "/" && !currentUrl.includes("dashboard")
          ? "pt-10 pb-5"
          : ""
      }`}
    >
      {children}
    </main>
  );
};

export default Main;
