import { Checkbox } from "@/components/ui/checkbox";
import usePermissionStore from "@/store/role-store";
import React, { useState } from "react";

const RoleColumnsActions = ({ row, mycolumn }) => {
  const [isChecked, setIsChecked] = useState(
    row.original.permission.includes(mycolumn.accessorKey)
  );
  const updatePermission = usePermissionStore(
    (state) => state.updatePermission
  );

  const handleCheckboxChange = (role, permission, value) => {
    updatePermission(role, permission, value);
    return value;
  };

  return (
    <Checkbox
      checked={isChecked}
      onCheckedChange={(value) =>
        setIsChecked(
          handleCheckboxChange(row.original.role, mycolumn.accessorKey, value)
        )
      }
      aria-label="Select row"
    />
  );
};

export default RoleColumnsActions;
