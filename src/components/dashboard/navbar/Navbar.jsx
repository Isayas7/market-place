"use client";
import React from "react";
import { ModeToggle } from "../../themeprovider/mode-toggle";
import { UserNav } from "./user-nav";
import { Search } from "./search";
import { IoNotificationsCircleOutline } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className="flex justify-between">
      <Search placeholder="Search..." className=" p-2" />
      <div className="flex gap-2 items-center">
        <IoNotificationsCircleOutline className="text-4xl text-palesky cursor-pointer" />
        <ModeToggle />
        <UserNav />
      </div>
    </div>
  );
};

export default Navbar;
