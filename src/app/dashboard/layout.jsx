"use client";
import Navbar from "@/components/dashboard/navbar/navbar";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const Layout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`grid  grid-rows-custom h-screen ${
        isCollapsed ? "grid-cols-collapsed" : "grid-cols-notCollapsed"
      }`}
    >
      <header className=" relative  py-3 px-12  rounded-sm ">
        <Navbar />
        <div className="absolute -left-4 top-3  ">
          <Button
            variant="secondary"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="rounded-full p-2 z-50 border dark:border-gray-600 border-dashed"
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </header>

      <aside className=" overflow-y-scroll overflow-x-hidden row-custom px-6  border-r dark:border-gray-600 border-dashed  ">
        <Sidebar isCollapsed={isCollapsed} />
      </aside>
      <main className="pt-10  px-12 overflow-y-scroll">{children}</main>
    </div>
  );
};

export default Layout;
