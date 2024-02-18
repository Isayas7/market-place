"use client";
import React from "react";
import { ModeToggle } from "../../themeprovider/mode-toggle";
import { UserNav } from "./user-nav";
import { Search } from "./search";

const Navbar = () => {
  return (
    <div className="flex justify-between py-6">
      <Search placeholder="Search..." className=" p-2" />
      <div className="flex gap-2 items-center">
        <ModeToggle />
        <UserNav />
      </div>
    </div>
  );
};

export default Navbar;
