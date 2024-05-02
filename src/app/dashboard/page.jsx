"use client";

import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VscGraph } from "react-icons/vsc";
import { MdAutoGraph } from "react-icons/md";
import { BsGraphDownArrow } from "react-icons/bs";
import { VscGraphLine } from "react-icons/vsc";

const Dashboard = () => {
  return (
    <div className="">
      <div className="flex w-full  gap-6 flex-col xl:flex-row  ">
        <div className="w-full xl:w-2/3 bg-swansdown flex  rounded-lg p-8 justify-between flex-col lg:flex-row items-center lg:items-start gap-4">
          {/* card content */}
          <div className="bg-swansdown   h-3/4  text-center lg:text-start flex flex-col justify-between items-center lg:items-start ">
            <div>
              <h1 className=" dark:text-black text-2xl font-semibold">
                Welcome back 👋
              </h1>
              <h1 className=" dark:text-black text-2xl font-semibold">
                Isayas Melkamu
              </h1>
            </div>
            <p className="text-jade">
              If you are going to use a passage of Lorem Ipsum, you need to be
              sure there isn't anything.
            </p>
            <Button className="bg-jade hover:bg-jadeh text-white font-medium w-min ">
              Go now
            </Button>
          </div>
          <div className=" xl:aspect-[9/6]">
            <Image
              src={"/dashboard.png"}
              className="size-full"
              alt=""
              width={300}
              height={200}
            />
          </div>
        </div>
        <div className="h-full w-full xl:w-1/3 xl:ml-0 rounded-lg flex bg-card items-center">
          <Carousel className="h-full w-full ">
            <CarouselContent>
              <CarouselItem>
                <Image
                  src={"/cru1.jpeg"}
                  className="h-full w-full rounded-lg"
                  alt="my"
                  width={700}
                  height={500}
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src={"/cru2.jpg"}
                  className="h-full w-full rounded-lg"
                  alt="my"
                  width={700}
                  height={300}
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src={"/cru3.jpg"}
                  className="h-full w-full rounded-lg"
                  alt="my"
                  width={700}
                  height={300}
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      <div className="mt-8 flex flex-col md:flex-row gap-4">
        <Card className="w-full flex items-center py-6 justify-between pr-6">
          <CardContent className="flex flex-col justify-between h-full gap-4">
            <CardDescription className="text-black dark:text-white font-medium text-lg">
              Total daily transaction
            </CardDescription>
            <CardDescription className="font-bold text-black dark:text-white flex gap-4">
              <MdAutoGraph className="text-lg text-jade" />
              +2.6%
            </CardDescription>
            <CardTitle className="font-bold text-4xl">18,765</CardTitle>
          </CardContent>
          <VscGraph className="text-6xl text-jade" />
        </Card>
        <Card className="w-full flex items-center py-6 justify-between pr-6">
          <CardContent className="flex flex-col justify-between h-full gap-4">
            <CardDescription className="text-black dark:text-white font-medium text-lg">
              Total daily sales
            </CardDescription>
            <CardDescription className="font-bold text-black dark:text-white flex gap-4">
              <VscGraphLine className="text-lg text-red-500" />
              +2.6%
            </CardDescription>
            <CardTitle className="font-bold text-4xl">4,250</CardTitle>
          </CardContent>
          <BsGraphDownArrow className="text-6xl text-jade" />
        </Card>
        <Card className="w-full flex items-center py-6 justify-between pr-6">
          <CardContent className="flex flex-col justify-between h-full gap-4">
            <CardDescription className="text-black dark:text-white font-medium text-lg">
              Total active users
            </CardDescription>
            <CardDescription className="font-bold text-black dark:text-white flex gap-4">
              <MdAutoGraph className="text-lg text-jade" />
              +2.6%
            </CardDescription>
            <CardTitle className="font-bold text-4xl">765</CardTitle>
          </CardContent>
          <VscGraph className="text-6xl text-jade" />
        </Card>
      </div>
      <div className="mt-4">
        {/* <Card><PieChartWithPaddingAngle /></Card> */}
      </div>
    </div>
  );
};

export default Dashboard;
