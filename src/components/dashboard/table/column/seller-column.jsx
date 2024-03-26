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
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { UseApproveQuery, UseDeactivateQuery } from "@/hooks/use-users-query";

export const seller_column = [
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
      <DataTableColumnHeader column={column} title="Sell Status" />
    ),
    cell: ({ row }) => {
      const user = row.original;

      const {
        mutate: approve,
        isSuccess,
        isLoading,
      } = UseApproveQuery("sellers");
      const status = row.original.status;

      if (status) {
        return <Button onClick={() => approve(user._id)}>Approved</Button>;
      } else {
        return (
          <Button className="bg-destructive" onClick={() => approve(user._id)}>
            Approve
          </Button>
        );
      }
    },
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.isActive;
      if (status) {
        return <Button>Active</Button>;
      } else {
        return <Button className="bg-destructive">Banned</Button>;
      }
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const {
        mutate: deactivate,
        isSuccess,
        isLoading,
      } = UseDeactivateQuery("sellers");

      const user = row.original;
      const router = useRouter();

      const handleViewClick = () => {
        router.push(`user/view/${user._id}`);
      };

      const handleDeactivate = () => {
        const deactivatedUser = deactivate(user._id);
      };
      const status = row.original.isActive;

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

            <DropdownMenuItem onClick={handleViewClick}>View </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpen(true)}>
              {status ? "Deactivate" : "Activate"}
            </DropdownMenuItem>
          </DropdownMenuContent>
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {status
                    ? " Are you sure do you want to deactivate this user?"
                    : " Are you sure do you want to activate this user?"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently deactivate
                  this account and hide some data from our users.
                  {status
                    ? "  This action cannot be undone. This will  deactivate" +
                      "this account and hide some data from our users."
                    : "  This action cannot be undone. This will  activate" +
                      "this account and unhide some data to our users."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDeactivate(user)}>
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
