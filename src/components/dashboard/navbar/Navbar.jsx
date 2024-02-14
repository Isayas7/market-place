"use client";
import React from "react";
import { ModeToggle } from "../../themeprovider/ModeToggle";
import { UserNav } from "./UserNav";
import { Search } from "./Search";

const Navbar = () => {
  return (
    <div className="flex justify-between">
      <Search />
      <div className="flex gap-2 items-center">
        <ModeToggle />
        <UserNav />
      </div>
    </div>
  );
};

export default Navbar;
