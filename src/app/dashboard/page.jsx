"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import Image from "next/image";

const Dashboard = () => {
  const handleClick = () => {
    console.log("first");
  };

  return (
    <div>
      <div className=" flex flex-col gap-2 lg:flex-row   ">
        <Card className="w-full lg:w-2/3 flex  bg-largeCard text-largeCard-foreground">
          <div className="w-2/3 ">
            <CardHeader>
              <CardTitle className="text-2xl">Welcome back 👋 </CardTitle>
              <CardTitle className="text-2xl">Jaydon Frankie</CardTitle>
            </CardHeader>
            <CardContent>
              If you are going to use a passage of Lorem Ipsum, you need to be
              sure there isn't anything.
            </CardContent>
            <CardFooter>
              <Button onClick={handleClick}>Go Now</Button>
            </CardFooter>
          </div>
          <div className="w-1/3 flex a justify-center items-center ">
            <Image
              className="h-fit "
              alt="man"
              src="https://github.com/shadcn.png"
              width={100}
              height={50}
            />
          </div>
        </Card>

        <Card className=" w-full lg:w-1/3">
          <CardHeader>
            <CardTitle>Welcome back 👋 Jaydon Frankie</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              If you are going to use a passage of Lorem Ipsum, you need to be
              sure there isn't anything.
            </p>
          </CardContent>
          <CardFooter>
            <Button>Go Now</Button>
          </CardFooter>
        </Card>
      </div>

      <div className=" flex flex-col lg:flex-row  gap-5 mt-5">
        <Card className=" flex-1 ">
          <CardHeader>
            <CardTitle>Total Active Users</CardTitle>
            <CardDescription>+2.6%</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl">18,765</p>
          </CardContent>
        </Card>
        <Card className=" flex-1">
          <CardHeader>
            <CardTitle>Total Active Users</CardTitle>
            <CardDescription>+2.6%</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl">18,765</p>
          </CardContent>
        </Card>
        <Card className=" flex-1">
          <CardHeader>
            <CardTitle>Total Active Users</CardTitle>
            <CardDescription>+2.6%</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl">18,765</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
