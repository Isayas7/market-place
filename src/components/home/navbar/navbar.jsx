"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../../themeprovider/mode-toggle";
import Image from "next/image";
import { Search } from "@/components/dashboard/navbar/search";
import CustomSheet from "./custom-sheet";
import { UserNav } from "@/components/dashboard/navbar/user-nav";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

const links = [
  {
    id: 6,
    title: "Dashboard",
    url: "/dashboard",
  },
];

const Navbar = () => {
  const currentUrl = usePathname();
  const session = useSession();

  return (
    <div
      className={` py-1 sticky z-50 top-0 w-full  
      
      border-b border-slate-900/10 dark:border-slate-300/10   bg-background
      ${currentUrl.includes("/dashboard") ? "hidden" : ""} `}
    >
      <div>
        <div
          className={`container  mx-auto flex  justify-between items-center transition-all duration-300  `}
        >
          <div className="flex items-center gap-5">
            <span className={`  ${currentUrl === "/" ? "xl:hidden " : ""} `}>
              <CustomSheet />
            </span>
            <Link href="/">
              <Image
                src={"/icon.png"}
                alt="logo"
                width={100}
                height={100}
                className="size-12"
              />
            </Link>
          </div>

          <Search
            placeholder="Search Products... "
            className="rounded-md lg:w-[400px] "
          />
          <div className="flex items-center space-x-4 lg:space-x-6  xl:space-x-8">
            {session.status === "authenticated" && (
              <Button variant="outline">
                <Link href={"/storefront"}>Sell</Link>
              </Button>
            )}

            {session.status === "unauthenticated" && (
              <Link href={"/login"}>Login</Link>
            )}
            {session.status === "authenticated" && (
              <Link href={"/dashboard"}>Dashboard</Link>
            )}
            <UserNav />
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
