"use client";

import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "../data-table-column-header";
import formatDate from "@/utils/formatDate";
import { CircleIcon, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const order_columns = [
  //   {
  //     id: "select",
  //     header: ({ table }) => (
  //       <Checkbox
  //         checked={
  //           table.getIsAllPageRowsSelected() ||
  //           (table.getIsSomePageRowsSelected() && "indeterminate")
  //         }
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label="Select all"
  //       />
  //     ),
  //     cell: ({ row }) => (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //       />
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  //   },
  {
    accessorKey: "_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order ID" />
    ),
    cell: ({ row }) => {
      const id = row.original._id;
      return "ORD-#" + id.slice(0, 4);
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Date" />
    ),
    cell: ({ row }) => {
      return formatDate(row.original.createdAt);
    },
  },

  {
    accessorKey: "buyerName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Buyer Full Name" />
    ),
    cell: ({ row }) => {
      return (
        row.original.buyerId.firstName + " " + row.original.buyerId.middleName
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return row.original.buyerId.email;
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Receiver Address" />
    ),
    cell: ({ row }) => {
      return row?.original?.receiverInformation.address;
    },
  },
  {
    accessorKey: "deliveryPersonnel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assgned Delivery" />
    ),
    cell: ({ row }) => {
      return (
        row.original?.deliveryPersonnelId?.firstName +
        " " +
        row.original?.deliveryPersonnelId?.lastName
      );
    },
  },
  {
    accessorKey: "recieverAddress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shipping Address" />
    ),
    cell: ({ row }) => {
      return row.original.receiverInformation.address;
    },
  },
  {
    accessorKey: "orderStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Status" />
    ),
    cell: ({ row }) => {
      const id = row.original._id;
      if (row.original.orderStatus === "Delivered") {
        return (
          <Badge
            className="border-jade bg-white dark:bg-gray-950"
            variant="outline"
          >
            <CircleIcon className="h-3 w-3 -translate-x-1 animate-pulse fill-green-300 text-green-300" />
            Delivered
          </Badge>
        );
      } else if (row.original.orderStatus === "Pending") {
        return (
          <Badge
            className="border-red-600 bg-white dark:bg-gray-950"
            variant="outline"
          >
            <CircleIcon className="h-3 w-3 -translate-x-1 animate-pulse fill-red-300 text-red-300" />
            Pending
          </Badge>
        );
      } else if (row.original.orderStatus === "Shipping") {
        return (
          <Badge
            className="border-yellow-600 bg-white dark:bg-gray-950"
            variant="outline"
          >
            <CircleIcon className="h-3 w-3 -translate-x-1 animate-pulse fill-yellow-300 text-yellow-300" />
            Shipping
          </Badge>
        );
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Button size="sm">
          <EyeIcon className="text-xs" />
        </Button>
      );
    },
  },
];
