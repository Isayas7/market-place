import { create } from "zustand";

const usePermissionStore = create((set) => {
  return {
    permission: [],
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

        return { updatedPermission };
      });
    },
  };
});

export default usePermissionStore;
