"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import usePermissionStore from "@/store/role-store";
import { useRoleUpdateQuery } from "@/hooks/use-role-query";
import SellectForFilter from "@/components/select-for-filter";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function DataTable({
  currentPage,
  totalPage,
  columns,
  data,
  dataInfo,
  rendered,
  userGroup,
  searchBy,
}) {
  const [sorting, setSorting] = useState();
  const [columnFilters, setColumnFilters] = useState();
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [clear, setClear] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const search = useSearchParams();
  const queryString = new URLSearchParams(search);

  const parametersToKeep = ["page", "role"];
  let tab;

  if (typeof localStorage !== "undefined") {
    tab = localStorage.getItem("tab");
  }

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(search.toString());
      params.set(name, value);

      return params.toString();
    },
    [search]
  );

  const filterSearchParams = () => {
    for (const key of Array.from(queryString.keys())) {
      if (!parametersToKeep.includes(key)) {
        queryString.delete(key);
      }
    }
    router.replace(`${pathname}?${queryString.toString()}`);
  };

  const checkParamsExistence = () => {
    const keys = Array.from(queryString.keys());
    return (
      keys.length === 0 ||
      (parametersToKeep.some((key) => keys.includes(key)) &&
        keys.every((key) => parametersToKeep.includes(key)) &&
        keys.length <= parametersToKeep.length)
    );
  };

  const RenderResetButton = () => {
    if (!checkParamsExistence()) {
      return (
        <Button
          variant="outline"
          onClick={() => {
            setClear(true);
            filterSearchParams();
          }}
        >
          Reset
        </Button>
      );
    } else {
      return null;
    }
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const updatedPermission = usePermissionStore(
    (state) => state.updatedPermission
  );
  const { mutate: updateRole, isSuccess, isLoading } = useRoleUpdateQuery();

  const handleSave = () => {
    updateRole(updatedPermission);
    usePermissionStore.setState({ updatedPermission: {} });
  };

  return (
    <div>
      <div className="flex items-center py-4">
        <div className="flex gap-2 items-center">
          <Input
            placeholder={"Search table..."}
            value={table.getColumn(searchBy)?.getFilterValue()}
            onChange={(event) =>
              table.getColumn(searchBy)?.setFilterValue(event.target.value)
            }
            className="w-44"
          />
          <span>Filter By: </span>
          {(rendered === "category" || rendered === "product") && (
            <>
              <SellectForFilter
                clear={clear}
                setClear={setClear}
                rendered="category"
                filter="Category"
                dataInfo={dataInfo}
              />
            </>
          )}

          {rendered !== "role" && (
            <>
              <SellectForFilter
                clear={clear}
                setClear={setClear}
                rendered="all"
                filter="Status"
                dataInfo={dataInfo}
              />
            </>
          )}

          <RenderResetButton />
        </div>
        <div className="ml-auto flex space-x-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Columns</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          {rendered === "delivery_personnel" && (
            <Link href="user/new">
              <Button variant="outline"> +New User</Button>
            </Link>
          )}
          {rendered === "category" && (
            <Link href="category/new">
              <Button variant="outline"> +New Category</Button>
            </Link>
          )}
          {rendered === "role" && (
            <Button variant="outline" onClick={handleSave}>
              Save
            </Button>
          )}
        </div>
      </div>

      {data ? (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows?.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className=" flex justify-between items-center">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row selected.
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
              <span>
                Page {currentPage} of {totalPage}
              </span>
              <Button
                disabled={currentPage - 1 === 0 || currentPage > totalPage}
                variant="outline"
                size="sm"
                onClick={() => {
                  router.push(
                    pathname + "?" + createQueryString("page", currentPage - 1)
                  );
                }}
              >
                Previous
              </Button>

              <Button
                disabled={currentPage === totalPage || currentPage >= totalPage}
                variant="outline"
                size="sm"
                onClick={() => {
                  router.push(
                    pathname + "?" + createQueryString("page", currentPage + 1)
                  );
                }}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-1/2">
          <AiOutlineLoading3Quarters className="text-5xl text-jade animate-spin" />
        </div>
      )}
    </div>
  );
}
