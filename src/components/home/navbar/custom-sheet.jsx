"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Cross2Icon } from "@radix-ui/react-icons";
import { AlignJustify, ArrowLeft, ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export const menuItems = [
  {
    category: "Shop by Department",
    items: [
      { title: "shoes" },
      { title: "T-shirt" },
      { title: "Category" },
      { title: "Store" },
      { title: "Product" },
      { title: "Order" },
    ],
  },
  {
    category: "Digital Content & Devices",
    items: [
      { title: "Dashboard" },
      { title: "User" },
      { title: "Product Category" },
      { title: "Store" },
      { title: "Product" },
      { title: "Order" },
    ],
  },
];

const CustomSheet = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const session = useSession();

  return (
    <Sheet>
      <SheetTrigger>
        <AlignJustify />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="w-[22.8rem] border-none overflow-y-scroll p-0"
      >
        <SheetHeader>
          <div className="flex justify-between items-center fixed w-[22.8rem] pl-8 pr-2 bg-headercolor-default  py-2.5">
            <div className="flex space-x-6 items-center cursor-pointer">
              <Avatar className="h-8 w-8">
                <AvatarImage src={session?.data?.user?.image} alt="man" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <SheetTitle>
                <div className="cursor-pointer text-foreground">
                  Hello, sign in
                </div>
              </SheetTitle>
            </div>

            <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
              <Cross2Icon className="h-4 w-4" />
            </SheetClose>
          </div>
        </SheetHeader>
        <SheetTitle className="pt-16">
          {expandedCategory ? (
            <div>
              <div
                onClick={() => setExpandedCategory(null)}
                className="flex items-center space-x-5 pl-8 pr-2 py-1 hover:bg-hovered cursor-pointer"
              >
                <ArrowLeft />
                <span className="py-1 text-base ">MAIN MENU</span>
              </div>

              <Separator />
              <div className="pl-8 my-4 text-lg">{expandedCategory}</div>

              {menuItems
                .find((item) => item.category === expandedCategory)
                .items.map((item) => (
                  <div
                    key={item.title}
                    className="pl-8 pr-2 flex justify-between py-2 hover:bg-hovered cursor-pointer text-palesky"
                  >
                    <Link href={`/${item.title}`}>{item.title}</Link>
                  </div>
                ))}
            </div>
          ) : (
            menuItems.map((list) => (
              <div key={list.category}>
                <div
                  className="pl-8 pr-2 flex justify-between py-2 hover:bg-hovered cursor-pointer"
                  onClick={() =>
                    setExpandedCategory(
                      expandedCategory === list.category ? null : list.category
                    )
                  }
                >
                  {list.category}
                  <ChevronRight />
                </div>
              </div>
            ))
          )}
        </SheetTitle>
      </SheetContent>
    </Sheet>
  );
};

export default CustomSheet;
