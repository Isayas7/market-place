"use client";

import { Button } from "@/components/ui/button";
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
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "../data-table-column-header";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { statusData } from "@/utils/permission";
import React, { useState } from "react";
import { useCategoryDeactivateQuery } from "@/hooks/use-product-category-query";
import Link from "next/link";

export const category_columns = [
  {
    accessorKey: "Image",
    cell: ({ row }) => {
      const image = row.original.categoryImage;
      return (
        <Image
          alt="Image"
          src={image || "/nullid.jpg"}
          width={500}
          height={500}
          className="rounded-full object-cover size-8"
        />
      );
    },
  },
  {
    accessorKey: "categoryName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category Name" />
    ),
  },
  {
    accessorKey: "variants",

    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
        {row.original.variants?.slice(0, 3).map((product, index) => (
          <React.Fragment key={index}>
            <span>{product.name}</span>
            {index < 2 && <span className="border-r-[0.5px] h-4" />}
          </React.Fragment>
        ))}
        {row.original.variants?.length > 3 && <span>...</span>}
      </div>
    ),
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      if (status === statusData.Active) {
        return <Badge>Active</Badge>;
      } else {
        return <Badge variant="destructive">Banned</Badge>;
      }
    },
  },
  {
    accessorKey: "creator",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Creator" />
    ),
  },
  {
    id: "actions",
    Cell: ({ row }) => {
      const [open, setOpen] = useState(false);

      const categoryData = row.original;
      const { status } = categoryData;

      const {
        mutate: deactivate,
        isSuccess,
        isLoading,
      } = useCategoryDeactivateQuery();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link href={`category/view/${categoryData._id}`}>
              <DropdownMenuItem>View</DropdownMenuItem>
            </Link>
            <Link href={`category/update/${categoryData._id}`}>
              <DropdownMenuItem>Update</DropdownMenuItem>
            </Link>

            <DropdownMenuItem onClick={() => setOpen(true)}>
              {status === statusData.Active ? "Deactivate" : "Activate"}
            </DropdownMenuItem>
          </DropdownMenuContent>
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {status === statusData.Active
                    ? " Are you sure do you want to deactivate this user?"
                    : " Are you sure do you want to activate this user?"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently deactivate
                  this account and hide some data from our users.
                  {status === statusData.Active
                    ? "  This action cannot be undone. This will  deactivate" +
                      "this account and hide some data from our users."
                    : "  This action cannot be undone. This will  activate" +
                      "this account and unhide some data to our users."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deactivate(categoryData._id)}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenu>
      );
    },
  },
];
