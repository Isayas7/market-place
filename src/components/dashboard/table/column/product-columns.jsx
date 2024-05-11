"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "../data-table-column-header";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { statusData } from "@/utils/permission";
import React, { useState } from "react";
import { useVariantDeactivateQuery } from "@/hooks/use-product-category-query";

export const product_columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Image",
    cell: ({ row }) => {
      const image = row.original.productImage[0];
      return (
        <Image
          src={image || "/nullid.jpg"}
          width={500}
          height={500}
          className="rounded-full object-cover size-8"
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },

  {
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          {<Badge variant="outline">{row.original.categoryName}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
    accessorKey: "categoryName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
  },
  {
    accessorKey: "variants",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Variant" />
    ),
  },
  {
    accessorKey: "brand",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Brand" />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
  },
  {
    accessorKey: "averageStar",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rating" />
    ),
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Creator" />
    ),
  },
];
