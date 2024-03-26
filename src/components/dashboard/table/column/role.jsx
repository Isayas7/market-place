import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "../data-table-column-header";
import usePermissionStore from "@/store/role-store";
import { permissions } from "@/utils/permission";

export const role_columns = (operation) => {
  const permissionsToDynamicColumns = (permissionArray) => {
    return permissionArray?.map((permission) => {
      return {
        accessorKey: permission,
        title: permission
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
      };
    });
  };

  const userPermissions = permissions[operation];
  const dynamicColumns = permissionsToDynamicColumns(userPermissions);

  const updatePermission = usePermissionStore(
    (state) => state.updatePermission
  );
  // const updateMyPermission = usePermissionStore(
  //   (state) => state.updateMyPermission
  // );

  const handleCheckboxChange = (name, permission, value) => {
    // updateMyPermission(name, permission);

    updatePermission(name, permission, value);
    return value;
  };
  if (dynamicColumns) {
    return [
      {
        accessorKey: "name",
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
        cell: ({ row }) => {
          const [isChecked, setIsChecked] = useState(
            row.original.permission.includes(mycolumn.accessorKey)
          );

          const handleIsChecked = (value) => {
            const haspermission = handleCheckboxChange();
            setIsChecked(haspermission);
          };

          return (
            <Checkbox
              checked={isChecked}
              onCheckedChange={(value) =>
                setIsChecked(
                  handleCheckboxChange(
                    row.original.name,
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
