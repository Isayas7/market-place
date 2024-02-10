"use client";
import React from "react";
import { ModeToggle } from "../themeprovider/ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Navbar = () => {
  return (
    <div className="flex justify-between">
      Navbar
      <div className="flex gap-2 items-center">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className=" w-48" align="end">
            <div className="flex-col px-2 py-1">
              <div>Ebo Girma</div>
              <div>ebo@gmail.com</div>
            </div>

            <hr />
            <div className="pt-1">
              <DropdownMenuItem className="cursor-pointer">
                Home
              </DropdownMenuItem>
            </div>
            <div className="pt-1">
              <DropdownMenuItem className="cursor-pointer">
                profile
              </DropdownMenuItem>
            </div>
            <div className="py-1 ">
              <DropdownMenuItem className="cursor-pointer">
                Settings
              </DropdownMenuItem>
            </div>

            <hr />
            <DropdownMenuItem className="text-destructive focus:text-destructive  cursor-pointer">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
