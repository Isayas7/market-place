import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import React from "react";
import { CiMenuKebab } from "react-icons/ci";

const NavbarMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="">
        <CiMenuKebab className=" text-2xl " />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <Link href={`chat`}>
          <DropdownMenuItem>chat</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link href={`seller`}>
          <DropdownMenuItem>My Store</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarMenu;
