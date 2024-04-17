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
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

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
      const image = row.original.image;
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
      <DataTableColumnHeader column={column} title="product Name" />
    ),
  },
  {
    accessorKey: "brands",
    cell: ({ row }) => {
      return row.original.brands?.map((b) => {
        return <span>{b.name + ", "}</span>;
      });
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
  {
    accessorKey: "creator",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Creator" />
    ),
  },
  {
    id: "branding",
    cell: ({ row }) => {
      return (
        <Link
          href={{
            pathname: "product/new",
            query: {
              categoryName: row.original.categoryName,
              productType: row.original.name,
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
    cell: ({ row }) => {
      const category = row.original;
      const router = useRouter();

      const handleUpdateClick = () => {
        router.push(`category/update/${category._id}`);
      };
      const handleViewClick = () => {
        router.push(`category/view/${category._id}`);
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
