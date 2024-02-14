"use client";
import Navbar from "@/components/dashboard/navbar/Navbar";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { AlignJustify } from "lucide-react";

const Layout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`grid  grid-rows-custom  h-screen ${
        isCollapsed ? "lg:grid-cols-collapsed " : " lg:grid-cols-notCollapsed "
      }`}
    >
      <header className=" relative  py-3 px-12  rounded-sm ">
        <div className="flex items-center space-x-5">
          <div className="lg:hidden py-3">
            <AlignJustify onClick={() => setOpen(!open)} />
          </div>

          <div className="flex-1">
            <Navbar />
          </div>
        </div>
        <div className="absolute -left-4 top-3  ">
          <Button
            variant="secondary"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:block rounded-full p-2 z-50 border dark:border-gray-600 border-dashed"
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </header>

      <aside className=" hidden lg:block overflow-y-scroll overflow-x-hidden row-custom px-6  border-r dark:border-gray-600 border-dashed  ">
        <Sidebar isCollapsed={isCollapsed} open={open} setOpen={setOpen} />
      </aside>

      <main className="pt-10  px-12 overflow-y-scroll ">{children}</main>
    </div>
  );
};

export default Layout;
