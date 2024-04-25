"use client";

import { DataTable } from "@/components/dashboard/table/data_table";
import { role_columns } from "@/components/dashboard/table/column/role-column";
import RoleForm from "@/components/dashboard/role/role-form";
import { UseRoleQuery } from "@/hooks/use-role-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import usePermissionStore from "@/store/role-store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { permissions } from "@/utils/permission";
import { useState } from "react";

const Category = () => {
  const [selectedOption, setSelectedOption] = useState("user");

  const { data: roles } = UseRoleQuery();
  usePermissionStore.setState({ permission: roles?.data });
  // const data = usePermissionStore((state) => state.permission);
  const columns = role_columns(selectedOption);

  console.log(" roles?.data", roles?.data);

  // console.log("roles?.data", roles?.data);

  if (roles) {
    return (
      <div>
        <Select onValueChange={(value) => setSelectedOption(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select an operation" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Variables</SelectLabel>
              {Object.keys(permissions).map((key) => (
                <SelectItem key={key} value={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <DataTable
          columns={columns}
          rendered="role"
          data={roles?.data}
          searchBy="role"
        />
        <RoleForm />
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center h-1/2">
        <AiOutlineLoading3Quarters className="text-5xl text-jade animate-spin" />
      </div>
    );
  }
};
export default Category;
