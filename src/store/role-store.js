import { create } from "zustand";

const usePermissionStore = create((set) => {
  return {
    permission: [],
    // updatePermission: (name, mypermission) => {
    //   set((state) => {
    //     const permissions = [...state.permission];
    //     const index = permissions.findIndex((role) => role.name === name);

    //     if (index !== -1) {
    //       permissions[index] = {
    //         ...permissions[index],
    //         permission: [
    //           ...(permissions[index].permission || []),
    //           mypermission,
    //         ],
    //       };
    //     } else {
    //       const newRole = { name, permission: [mypermission] };
    //       permissions.push(newRole);
    //     }
    //     return { permission: permissions };
    //   });
    // },
    updatePermission: (role, permission, isChecked) => {
      set((state) => {
        const updatedPermission = { ...state.updatedPermission };
        if (!isChecked) {
          if (updatedPermission[role]?.includes(permission)) {
          } else {
            updatedPermission[role] = [
              ...(updatedPermission[role] || []),
              permission,
            ];
          }
        } else {
          if (updatedPermission[role]?.includes(permission)) {
          } else {
            updatedPermission[role] = [
              ...(updatedPermission[role] || []),
              permission,
            ];
          }
        }

        console.log(updatedPermission, isChecked);

        return { updatedPermission };
      });
    },
  };
});

export default usePermissionStore;
