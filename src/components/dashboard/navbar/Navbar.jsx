"use client";

import { ModeToggle } from "../../themeprovider/mode-toggle";
import { UserNav } from "./user-nav";
import { Search } from "./search";
import { PiWechatLogoDuotone } from "react-icons/pi";
import Link from "next/link";
import Notification from "@/components/notification/notification";

const Navbar = () => {
  return (
    <div className="flex justify-between">
      <Search placeholder="Search..." className=" p-2" />
      <div className="flex gap-4 items-center">
        <Link href={"/chat"}>
          <PiWechatLogoDuotone className="text-3xl text-jade" />
        </Link>
        <Notification />
        <ModeToggle />
        <UserNav />
      </div>
    </div>
  );
};

export default Navbar;
