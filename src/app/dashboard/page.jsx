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
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardDescription,
} from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";

import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveLine } from "@nivo/line";

import { Badge } from "@/components/ui/badge";
import { CircleIcon, Link } from "lucide-react";

import { VscGraph } from "react-icons/vsc";
import { MdAutoGraph } from "react-icons/md";
import { BsGraphDownArrow } from "react-icons/bs";
import { VscGraphLine } from "react-icons/vsc";
import { useTheme } from "next-themes";

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
      <div className="mt-4 grid gap-6 ">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Sales by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart className="aspect-[4/3]" />
            </CardContent>
          </Card>
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Customer Demographics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PieChart className="aspect-[4/3]" />
            </CardContent>
          </Card>
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Sales Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart className="aspect-[4/3]" />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    <Link
                      className="text-jade hover:underline dark:text-jade"
                      href="#"
                    >
                      #12345
                    </Link>
                  </TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>$250.00</TableCell>
                  <TableCell>
                    <Badge
                      className="border-jade bg-white dark:bg-gray-950"
                      variant="outline"
                    >
                      <CircleIcon className="h-3 w-3 -translate-x-1 animate-pulse fill-green-300 text-green-300" />
                      Paid
                    </Badge>
                  </TableCell>
                  <TableCell>2023-04-15</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <Link
                      className="text-jade hover:underline dark:text-jade"
                      href="#"
                    >
                      #12346
                    </Link>
                  </TableCell>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>$150.00</TableCell>
                  <TableCell>
                    <Badge
                      className="border-yellow-600 bg-white dark:bg-gray-950"
                      variant="outline"
                    >
                      <CircleIcon className="h-3 w-3 -translate-x-1 animate-pulse fill-yellow-300 text-yellow-300" />
                      Cancel
                    </Badge>
                  </TableCell>
                  <TableCell>2023-04-12</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <Link
                      className="text-jade hover:underline dark:text-jade"
                      href="#"
                    >
                      #12347
                    </Link>
                  </TableCell>
                  <TableCell>Bob Johnson</TableCell>
                  <TableCell>$350.00</TableCell>
                  <TableCell>
                    <Badge
                      className="border-red-600 bg-white dark:bg-gray-950"
                      variant="outline"
                    >
                      <CircleIcon className="h-3 w-3 -translate-x-1 animate-pulse fill-red-300 text-red-300" />
                      Cancelled
                    </Badge>
                  </TableCell>
                  <TableCell>2023-04-10</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <Link
                      className="text-jade hover:underline dark:text-jade"
                      href="#"
                    >
                      #12348
                    </Link>
                  </TableCell>
                  <TableCell>Sarah Lee</TableCell>
                  <TableCell>$450.00</TableCell>
                  <TableCell>
                    <Badge
                      className="border-jade bg-white dark:bg-gray-950"
                      variant="outline"
                    >
                      <CircleIcon className="h-3 w-3 -translate-x-1 animate-pulse fill-green-300 text-green-300" />
                      Delivered
                    </Badge>
                  </TableCell>
                  <TableCell>2023-04-05</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <Link
                      className="text-jade hover:underline dark:text-jade"
                      href="#"
                    >
                      #12349
                    </Link>
                  </TableCell>
                  <TableCell>Michael Brown</TableCell>
                  <TableCell>$550.00</TableCell>
                  <TableCell>
                    <Badge
                      className="border-jade bg-white dark:bg-gray-950"
                      variant="outline"
                    >
                      <CircleIcon className="h-3 w-3 -translate-x-1 animate-pulse fill-green-300 text-green-300" />
                      Delivered
                    </Badge>
                  </TableCell>
                  <TableCell>2023-04-01</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
};

function BarChart(props) {
  const theme = useTheme();
  console.log(theme);
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          { name: "Jan", count: 111 },
          { name: "Feb", count: 157 },
          { name: "Mar", count: 129 },
          { name: "Apr", count: 150 },
          { name: "May", count: 119 },
          { name: "Jun", count: 72 },
        ]}
        keys={["count"]}
        indexBy="name"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={["#FCCD55"]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
              color: "#000",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
          axis: {
            ticks: {
              text: {
                fill: theme?.theme === "dark" ? "#FFF" : "#000",
              },
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A bar chart showing data"
      />
    </div>
  );
}

function PieChart(props) {
  return (
    <div {...props}>
      <ResponsivePie
        data={[
          { id: "Jan", value: 111 },
          { id: "Feb", value: 157 },
          { id: "Mar", value: 129 },
          { id: "Apr", value: 150 },
          { id: "May", value: 119 },
          { id: "Jun", value: 72 },
        ]}
        sortByValue
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        cornerRadius={0}
        padAngle={0}
        borderWidth={1}
        borderColor={"#ffffff"}
        enableArcLinkLabels={false}
        arcLabel={(d) => `${d.id}`}
        arcLabelsTextColor={"#ffffff"}
        arcLabelsRadiusOffset={0.65}
        colors={["#00A76F"]}
        theme={{
          labels: {
            text: {
              fontSize: "18px",
            },
          },
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
              color: "#000",
            },
          },
        }}
        role="application"
      />
    </div>
  );
}

function LineChart(props) {
  const theme = useTheme();

  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#00A76F", "#FCCD55"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
              color: "#000",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
          axis: {
            ticks: {
              text: {
                fill: theme?.theme === "dark" ? "#FFF" : "#000",
              },
            },
          },
        }}
        role="application"
      />
    </div>
  );
}

export default Dashboard;
