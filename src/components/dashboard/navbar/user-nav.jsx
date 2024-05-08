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
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function UserNav() {
  const router = useRouter();
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
          <DropdownMenuItem>
            <Link href={"/profile"}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={{
                pathname: "/products/order",
                query: {
                  userId: session?.data?.user?.id,
                },
              }}
            >
              Order
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={{
                pathname: "/delivery",
                query: {
                  deliveryPersonnel: session?.data?.user?.id,
                },
              }}
            >
              Delivery
            </Link>
          </DropdownMenuItem>
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
