"use client";
import Navbar from "@/components/dashboard/navbar/navbar";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { useState } from "react";

import { RiMenu4Line } from "react-icons/ri";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const Layout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }
  if (session.status === "unauthenticated") {
    router.replace("/");
  }

  if (session.status === "authenticated") {
    return (
      <div
        className={`grid  grid-rows-custom  h-screen transition-all duration-300  ${
          isCollapsed
            ? "lg:grid-cols-collapsed "
            : " lg:grid-cols-notCollapsed   "
        }`}
      >
        <header className=" relative  py-5 px-12  rounded-sm ">
          <div className="flex items-center space-x-5">
            <div className="lg:hidden py-3">
              <RiMenu4Line className="size-8" onClick={() => setOpen(!open)} />
            </div>

            <div className="flex-1 py-1.5">
              <Navbar />
            </div>
          </div>
          <div className="absolute -left-3 top-8  ">
            <Button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:block rounded-full p-1 z-50 border dark:border-gray-600 border-dashed size-6 text-palesky bg-white dark:bg-background"
            >
              <ChevronRightIcon
                className={`w-full h-full ${
                  isCollapsed ? "" : "rotate-180 transition-all duration-600 "
                }`}
              />
            </Button>
          </div>
        </header>

        <aside
          className={`hidden lg:flex group  hover:overflow-y-scroll overflow-y-hidden overflow-x-hidden row-span-full border-r dark:border-gray-600 border-dashed `}
        >
          <div className="w-full">
            <Sidebar isCollapsed={isCollapsed} open={open} setOpen={setOpen} />
          </div>
          <div className=" w-[5px]  group-hover:hidden  " />
        </aside>

        <main className=" container py-7 overflow-y-scroll  ">{children}</main>
      </div>
    );
  }
};
export default Layout;
