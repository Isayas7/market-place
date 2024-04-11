"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../../themeprovider/mode-toggle";
import Image from "next/image";
import { Search } from "@/components/dashboard/navbar/search";
import { UserNav } from "@/components/dashboard/navbar/user-nav";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { AlignJustify } from "lucide-react";
import List from "../list";
import { useMediaQuery } from "@/hooks/use-media-query";

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
  const [open, setOpen] = useState(false);
  const myRef = useRef(null);
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  useEffect(() => {
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  const handleClick = (e) => {
    if (myRef.current && !myRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    isDesktop && currentUrl === "/"
      ? (document.body.style.overflow = "auto")
      : open
      ? (document.body.style.overflow = "hidden") &&
        document.body.classList.add("lock")
      : (document.body.style.overflow = "auto") &&
        document.body.classList.remove("lock");
    return () => {
      document.body.style.overflow = "auto";
      document.body.classList.remove("lock");
    };
  }, [isDesktop, currentUrl, open]);

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
            {/* overlay */}
            <div
              aria-disabled={open}
              className={`${
                open
                  ? "fixed  top-[57px] inset-x-0 bottom-0  z-50 bg-black/60 "
                  : "hidden"
              } ${currentUrl === "/" ? "xl:hidden " : ""} `}
            />
            <div
              ref={myRef}
              className={`  ${currentUrl === "/" ? "xl:hidden " : ""} `}
            >
              <AlignJustify
                onClick={() => setOpen(!open)}
                className="size-7 cursor-pointer"
              />

              <div
                className={`${
                  open ? "block" : "hidden"
                } fixed z-50 flex bg-background pt-2 px-4  group  hover:overflow-y-scroll overflow-y-hidden   top-[57px] left-0 bottom-0 h-[calc(100vh-57px)] w-72 border-r border-slate-900/10 dark:border-slate-300/10`}
              >
                <div className="w-full">
                  <List />
                </div>
                <div className=" w-[8px]  group-hover:hidden  " />
              </div>
            </div>
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
