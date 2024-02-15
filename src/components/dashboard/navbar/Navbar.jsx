"use client";
import React from "react";
import { ModeToggle } from "../../themeprovider/ModeToggle";
import { UserNav } from "./UserNav";
import { Search } from "./Search";

const Navbar = () => {
  return (
    <div className="flex justify-between py-6">
      <Search className="w-full md:w-1/2 xl:w-1/3 p-2" />
      <div className="flex gap-2 items-center">
        <ModeToggle />
        <UserNav />
      </div>
    </div>
  );
};

export default Navbar;