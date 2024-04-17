"use client";
import React, { useState } from "react";
import { ModeToggle } from "../../themeprovider/mode-toggle";
import { UserNav } from "./user-nav";
import { Search } from "./search";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { Drawer, DrawerContent, DrawerOverlay } from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import NotificationCard from "@/components/notification/notification-card";
import { PiWechatLogoDuotone } from "react-icons/pi";
import Link from "next/link";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-between">
      <Search placeholder="Search..." className=" p-2" />
      <div className="flex gap-4 items-center">
        <Link href={"/chat"}>
          <PiWechatLogoDuotone className="text-3xl text-jade" />
        </Link>
        <div className="relative cursor-pointer" onClick={() => setOpen(!open)}>
          <IoNotificationsCircleOutline className="text-3xl rounded-full text-jade hover:text-white hover:bg-jade  cursor-pointer" />
          <p className="absolute hover:z-0 bg-red-500 rounded-full text-white top-[-4px] text-[8px] p-1 right-[-6px]">
            14+
          </p>
        </div>

        <Drawer
          direction="right"
          open={open}
          onOpenChange={setOpen}
          className="right-0"
        >
          <DrawerContent className="border-none overflow-y-scroll  right-0  overflow-x-hidden ">
            <NotificationCard />
          </DrawerContent>
        </Drawer>
        <ModeToggle />
        <UserNav />
      </div>
    </div>
  );
};

export default Navbar;
