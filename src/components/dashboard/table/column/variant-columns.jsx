"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { statusData } from "@/utils/permission";
import VariantColumnsActions from "../actions/variant-columns-actions";

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
    cell: ({ row }) => <VariantColumnsActions row={row} />,
  },
];
