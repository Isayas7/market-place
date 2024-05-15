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

export const variant_columns = [
  {
    accessorKey: "Image",
    cell: ({ row }) => {
      const image = row.original.image;
      return (
        <Image
          alt="VarinantImage"
          src={image || "/nullid.jpg"}
          width={500}
          height={500}
          className="rounded-full object-cover size-8"
        />
      );
    },
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="variants" />
    ),
  },
  {
    accessorKey: "brands",

    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
        {row?.original?.brands && (
          <>
            {row.original.brands.length > 0 ? (
              row.original.brands.slice(0, 3).map((brand, index) => (
                <React.Fragment key={index}>
                  <span>{brand.name}</span>
                  {index < 2 && <span className="border-r-[0.5px] h-4" />}
                </React.Fragment>
              ))
            ) : (
              <span>&mdash;</span>
            )}
            {row.original.brands.length > 3 && <span>...</span>}
          </>
        )}
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
        return <Badge variant="secondary">Active</Badge>;
      } else {
        return <Badge variant="destructive">Banned</Badge>;
      }
    },
  },

  {
    id: "branding",
    cell: ({ row }) => {
      return (
        <Link
          href={{
            pathname: "variant/new",
            query: {
              categoryName: row.original.categoryName,
              variants: row.original.name,
            },
          }}
        >
          <Button size="sm"> Add Brand</Button>
        </Link>
      );
    },
  },
  {
    id: "actions",
    Cell: ({ row }) => {
      const [open, setOpen] = useState(false);

      const variant = row.original;
      const brandlength = variant?.brands.length;

      const { status } = variant;

      const {
        mutate: deactivate,
        isSuccess,
        isLoading,
      } = useVariantDeactivateQuery();

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

            <Link
              className={`${
                brandlength < 1 && "opacity-50 pointer-events-none"
              }`}
              href={`variant/view/${variant._id}`}
            >
              <DropdownMenuItem>View</DropdownMenuItem>
            </Link>

            <Link
              className={`${
                brandlength < 1 && "opacity-50 pointer-events-none"
              }`}
              href={`variant/update/${variant._id}`}
            >
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
                <AlertDialogAction onClick={() => deactivate(variant._id)}>
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
