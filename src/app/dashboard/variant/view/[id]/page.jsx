"use client";

import React, { useState } from "react";
import { UseSingleVariantQuery } from "@/hooks/use-product-category-query";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { statusData } from "@/utils/permission";

const ViewBrands = ({ params }) => {
  const { data: single_category, isLoading } = UseSingleVariantQuery(params.id);
  const variantData = single_category?.data;
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="mb-2">
        <div className="text-xl my-2 font-bold "> View Brand</div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link href="/dashboard/variant">Variant</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>View Brand</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col gap-8 p-6 md:p-8 lg:p-10">
        <div className="flex items-center justify-between">
          <div className="grid gap-1">
            <h1 className="text-2xl font-bold">{variantData?.categoryName}</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Brands ({variantData?.brands?.length})
            </p>
          </div>
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-medium">{variantData?.variantName}</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {variantData?.brands?.map((brand, index) => (
            <Card   key={index} className="rounded-lg border p-4 shadow-sm relative">
              <div className="flex items-center justify-between">
                <>
                  <Image
                    alt="Nike"
                    className="rounded-lg object-cover"
                    height={100}
                    src={brand?.image}
                    style={{
                      aspectRatio: "100/100",
                      objectFit: "cover",
                    }}
                    width={100}
                  />
                  <div>
                    <h3 className="text-lg font-medium">{brand?.name}</h3>
                    <Badge className="rounded-full bg-green-500 px-3 py-1 text-sm font-medium text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700">
                      {brand?.status}
                    </Badge>
                  </div>
                </>
              </div>
              <div className="absolute top-0 right-3 ">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                    <DropdownMenuItem onClick={() => setOpen(true)}>
                      {brand?.status === statusData.Active
                        ? "Deactivate"
                        : "Activate"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                  <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          {brand?.status === statusData.Active
                            ? " Are you sure do you want to deactivate this user?"
                            : " Are you sure do you want to activate this user?"}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          deactivate this account and hide some data from our
                          users.
                          {brand?.status === statusData.Active
                            ? "  This action cannot be undone. This will  deactivate" +
                              "this account and hide some data from our users."
                            : "  This action cannot be undone. This will  activate" +
                              "this account and unhide some data to our users."}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deactivate(variantData._id)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenu>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewBrands;
