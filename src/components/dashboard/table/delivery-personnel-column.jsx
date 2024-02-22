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
import { DataTableColumnHeader } from "./data-table-column-header";
import { useRouter } from "next/navigation";

export const delivery_columns = [
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
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const router = useRouter();

      const handleUpdateClick = () => {
        router.push(`user/update`, { user });
      };
      const handleViewClick = () => {
        router.push(`user/view`, { user });
      };

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
            <DropdownMenuItem onClick={handleUpdateClick}>
              Update
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Deactivate
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
