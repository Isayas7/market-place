"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { hasBuyerRole, hasPDRole, hasSellerRole } from "@/middleware";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export function UserNav() {
  const session = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session?.data?.user?.image} alt="man" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session?.data?.user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.data?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="border-b dark:border-gray-600 border-dashed" />
        <DropdownMenuGroup>
          {session?.status === "authenticated" && (
            <DropdownMenuItem>
              <Link href={"/profile"}>Profile</Link>
            </DropdownMenuItem>
          )}
          {session?.status === "authenticated" &&
            hasSellerRole(session?.data?.user) && (
              <DropdownMenuItem>
                <Link href={"/seller"}>My Store</Link>
              </DropdownMenuItem>
            )}
          {hasBuyerRole(session?.data?.user) &&
            session?.data?.user.myrole.length === 1 && (
              <DropdownMenuItem>
                <Link href="/products/order">Order</Link>
              </DropdownMenuItem>
            )}
          {hasPDRole(session?.data?.user) && (
            <DropdownMenuItem>
              <Link href="/delivery">Delivery</Link>
            </DropdownMenuItem>
          )}
          {hasPDRole(session?.data?.user) && (
            <DropdownMenuItem>
              <Link href="/deliverypersonnel/balance">Balance</Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="border-b dark:border-gray-600 border-dashed" />
        <DropdownMenuItem
          onClick={() => {
            signOut({ callbackUrl: "/" });
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
