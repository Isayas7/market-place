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
      className={` pt-3 fixed z-50 w-full bg-background ${
        currentUrl.includes("/dashboard") ? "hidden" : ""
      } `}
    >
      <div>
        <div
          className={`container  mx-auto flex  justify-between items-center transition-all duration-300  `}
        >
          <Link href="/">
            <Image
              src={"/icon.png"}
              width={100}
              height={100}
              className="size-12"
            />
          </Link>
          <Search
            placeholder="Search Products... "
            className="rounded-md lg:w-[400px] "
          />
          <div className="flex items-center space-x-4 lg:space-x-6  xl:space-x-8">
            <Button variant="outline">Sell</Button>

            {session.status === "unauthenticated" && (
              <Link href={"/login"}>Login</Link>
            )}
            {session.status === "authenticated" && (
              <Link href={"/dashboard"}>Dashboard</Link>
            )}
            <UserNav />
          </div>
        </div>
      </div>
      <div className="bg-swansdown dark:bg-headercolor-default   ">
        <div className="container mx-auto flex items-center justify-between  py-2 ">
          <div className="flex items-center  space-x-5 ">
            <span className="xl:hidden  flex items-center">
              <CustomSheet />
            </span>

            <span>Trending</span>
          </div>

          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
