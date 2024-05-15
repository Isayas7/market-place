import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "../data-table-column-header";
import usePermissionStore from "@/store/role-store";
import { permissions } from "@/utils/permission";

export const role_columns = (operation) => {
  const userPermissions = permissions[operation];

  const dynamicColumns = userPermissions?.map((permission) => ({
    accessorKey: permission,
    title: permission
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
  }));

  const updatePermission = usePermissionStore(
    (state) => state.updatePermission
  );

  const handleCheckboxChange = (role, permission, value) => {
    updatePermission(role, permission, value);
    return value;
  };
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
        Cell: ({ row }) => {
          const [isChecked, setIsChecked] = useState(
            row.original.permission.includes(mycolumn.accessorKey)
          );

          return (
            <Checkbox
              checked={isChecked}
              onCheckedChange={(value) =>
                setIsChecked(
                  handleCheckboxChange(
                    row.original.role,
                    mycolumn.accessorKey,
                    value
                  )
                )
              }
              aria-label="Select row"
            />
          );
        },
      })),
    ];
  }
};
