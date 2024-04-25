"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import Link from "next/link";
import { CiMenuKebab } from "react-icons/ci";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Card } from "./ui/card";

export const CustomCard = ({ product, aspectRatio, className, ...props }) => {
  return (
    <Link href={`/products/${product._id}`}>
      <Card
        className={cn(
          "space-y-3 relative rounded-sm overflow-hidden h-full  border-none shadow",
          className
        )}
        {...props}
      >
        <div>
          <Image
            src={product.productImage[0]}
            alt={product.title}
            width={700}
            height={800}
            className={cn(
              "w-full h-full object-cover transition-all hover:scale-105",
              aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
            )}
          />
        </div>

        <div className="space-y-1 text-sm px-2 py-1">
          <h3 className="font-medium leading-none">{product.title}</h3>
          <p className="text-xs text-muted-foreground">{product.price}</p>
        </div>
        {/* <div className="absolute top-0 right-0">
          <DropdownMenu>
            <DropdownMenuTrigger className="p-2">
              <CiMenuKebab className=" text-2xl text-white  bg-transparent/40 hover:bg-transparent/80 rounded-full " />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem>View</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}
      </Card>
    </Link>
  );
};
