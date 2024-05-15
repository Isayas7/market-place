"use client";

import { DataTableColumnHeader } from "../data-table-column-header";
import { statusData } from "@/utils/permission";
import { Badge } from "@/components/ui/badge";
import BuyerColumnsActions from "../actions/buyer-columns-actions";

export const columns = [
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
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
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
    cell: ({ row }) => <BuyerColumnsActions row={row} />,
  },
];
