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
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "../data-table-column-header";
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
import { useState } from "react";
import { UseBankQuery, useUserDeactivateQuery } from "@/hooks/use-users-query";
import Link from "next/link";
import { statusData } from "@/utils/permission";
import { Badge } from "@/components/ui/badge";

export const delivery_columns = [
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fist Name" />
    ),
  },
  {
    accessorKey: "middleName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Middle Name" />
    ),
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
  },
  {
    accessorKey: "bankInfo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bank" />
    ),
    cell: ({ row }) => {
      const { data: banks } = UseBankQuery();
      return banks?.data?.data?.find((b) => b.id === row.original.bankInfo)
        ?.name;
    },
  },
  {
    accessorKey: "accountNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Account Number" />
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
    id: "actions",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const user = row.original;
      const { status } = user;

      const {
        mutate: deactivate,
        isSuccess,
        isLoading,
      } = useUserDeactivateQuery();

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

            <Link href={`deliverypersonnel/${user._id}`}>
              <DropdownMenuItem>View</DropdownMenuItem>
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
                <AlertDialogAction onClick={() => deactivate(user._id)}>
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
