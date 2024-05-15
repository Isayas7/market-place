import { DataTableColumnHeader } from "../data-table-column-header";
import { permissions } from "@/utils/permission";
import RoleColumnsActions from "../actions/role-columns-actions";

export const RoleColumns = (operation) => {
  const userPermissions = permissions[operation];

  const dynamicColumns = userPermissions?.map((permission) => ({
    accessorKey: permission,
    title: permission
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
  }));

  if (dynamicColumns) {
    return [
      {
        accessorKey: "role",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Roles" />
        ),
      },
      ...dynamicColumns?.map((mycolumn) => ({
        key: mycolumn.accessorKey,
        accessorKey: mycolumn.accessorKey,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={mycolumn.title} />
        ),
        cell: ({ row }) => <RoleColumnsActions row={row} mycolumn={mycolumn} />,
      })),
    ];
  }
};
