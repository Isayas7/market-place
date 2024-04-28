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
import ReactStars from "react-rating-stars-component";
import { Progress } from "@/components/ui/progress";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Separator } from "./ui/separator";
import { IoChevronForwardSharp } from "react-icons/io5";

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
        {/* <div className=" z-50">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <ReactStars
                    count={5}
                    value={product?.averageStar}
                    size={24}
                    edit={false}
                    activeColor="#ffd700"
                  />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className=" p-4 md:w-[400px]  ">
                    <div className="flex gap-3 items-center">
                      <ReactStars
                        count={5}
                        value={product?.averageStar}
                        size={24}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <span>{product?.averageStar} out of 5</span>
                    </div>
                    <span>{product?.ratings?.length} global ratings</span>
                    <div className="flex flex-col gap-3 mt-3">
                      <div className="flex gap-3 items-center w-full">
                        <span>5 star</span>
                        <Progress
                          value={product?.starFive || 0}
                          className="w-[70%] bg-slate-400 "
                        />
                        <span>{`${product?.starFive || 0}%`}</span>
                      </div>

                      <div className="flex gap-3 items-center w-full">
                        <span>4 star</span>
                        <Progress
                          value={product?.starFour || 0}
                          className="w-[70%]  bg-slate-400"
                        />
                        <span>{`${product?.starFour || 0}%`}</span>
                      </div>
                      <div className="flex gap-3 items-center w-full">
                        <span>3 star</span>
                        <Progress
                          value={product?.starThree}
                          className="w-[70%]  bg-slate-400"
                        />
                        <span> {`${product?.starThree || 0}%`}</span>
                      </div>
                      <div className="flex gap-3 items-center w-full">
                        <span>2 star</span>
                        <Progress
                          value={product?.starTwo}
                          className="w-[70%]  bg-slate-400"
                        />
                        <span> {`${product?.starTwo || 0}%`}</span>
                      </div>
                      <div className="flex gap-3 items-center w-full">
                        <span>1 star</span>
                        <Progress
                          value={product?.starOne}
                          className="w-[70%]  bg-slate-400"
                        />
                        <span> {`${product?.starOne || 0}%`}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-center items-center">
                        <span className="hover:border-b-2 inline w-fit cursor-pointer">
                          See customer reviews
                        </span>
                        <IoChevronForwardSharp />
                      </div>
                    </div>
                  </div>

            
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div> */}

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
