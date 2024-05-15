"use client";
import { DataTableColumnHeader } from "../data-table-column-header";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { statusData } from "@/utils/permission";
import CategoryColumnsActions from "../actions/category-columns-actions";

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
    cell: ({ row }) => <CategoryColumnsActions row={row} />,
  },
];
