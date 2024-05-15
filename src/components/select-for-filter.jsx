"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { orderStatus, statusData } from "@/utils/permission";
import { useCallback, useEffect, useState } from "react";

const SellectForFilter = ({ dataInfo, filter, rendered, clear, setClear }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      if (params.has("page")) {
        params.set("page", 1);
      }

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    if (clear === true) {
      setValue("");
      setClear(false);
    }
  }, [clear, setClear]);

  const RenderedFilter = () => {
    return (
      <>
        {rendered === "all" && (
          <>
            <CommandItem
              value={statusData.Active}
              onSelect={(currentValue) => {
                const capitalizedValue =
                  currentValue.charAt(0).toUpperCase() + currentValue.slice(1);
                setValue(capitalizedValue === value ? "" : capitalizedValue);
                setOpen(false);
                router.push(
                  pathname +
                    "?" +
                    createQueryString("status", statusData.Active)
                );
              }}
            >
              <Check
                className={cn(
                  "mr-4 h-4 w-4",
                  value === statusData.Active ? "opacity-100" : "opacity-0"
                )}
              />
              {statusData.Active}
            </CommandItem>
            <CommandItem
              value={statusData.Banned}
              onSelect={(currentValue) => {
                const capitalizedValue =
                  currentValue.charAt(0).toUpperCase() + currentValue.slice(1);
                setValue(capitalizedValue === value ? "" : capitalizedValue);
                setOpen(false);
                router.push(
                  pathname +
                    "?" +
                    createQueryString("status", statusData.Banned)
                );
              }}
            >
              <Check
                className={cn(
                  "mr-4 h-4 w-4",
                  value === statusData.Banned ? "opacity-100" : "opacity-0"
                )}
              />
              {statusData.Banned}
            </CommandItem>
          </>
        )}
        {(rendered === "category" || rendered === "product") &&
          filter === "Category" &&
          dataInfo?.map((item, index) => (
            <CommandItem
              key={index}
              value={item.categoryName}
              onSelect={(currentValue) => {
                const capitalizedValue =
                  currentValue.charAt(0).toUpperCase() + currentValue.slice(1);
                setValue(capitalizedValue === value ? "" : capitalizedValue);

                setOpen(false);
                router.push(
                  pathname +
                    "?" +
                    createQueryString("categoryName", item.categoryName)
                );
              }}
            >
              <Check
                className={cn(
                  "mr-4 h-4 w-4",
                  value === item.categoryName ? "opacity-100" : "opacity-0"
                )}
              />

              {item.categoryName}
            </CommandItem>
          ))}

        {rendered === "order" && (
          <>
            {" "}
            <CommandItem
              value={orderStatus.Pending}
              onSelect={(currentValue) => {
                const capitalizedValue =
                  currentValue.charAt(0).toUpperCase() + currentValue.slice(1);
                setValue(capitalizedValue === value ? "" : capitalizedValue);
                setOpen(false);
                router.push(
                  pathname +
                    "?" +
                    createQueryString("orderStatus", orderStatus.Pending)
                );
              }}
            >
              <Check
                className={cn(
                  "mr-4 h-4 w-4",
                  value === orderStatus.Pending ? "opacity-100" : "opacity-0"
                )}
              />
              {orderStatus.Pending}
            </CommandItem>
            <CommandItem
              value={orderStatus.Shipping}
              onSelect={(currentValue) => {
                const capitalizedValue =
                  currentValue.charAt(0).toUpperCase() + currentValue.slice(1);
                setValue(capitalizedValue === value ? "" : capitalizedValue);
                setOpen(false);
                router.push(
                  pathname +
                    "?" +
                    createQueryString("orderStatus", orderStatus.Shipping)
                );
              }}
            >
              <Check
                className={cn(
                  "mr-4 h-4 w-4",
                  value === orderStatus.Shipping ? "opacity-100" : "opacity-0"
                )}
              />
              {orderStatus.Shipping}
            </CommandItem>
            <CommandItem
              value={orderStatus.Delivered}
              onSelect={(currentValue) => {
                const capitalizedValue =
                  currentValue.charAt(0).toUpperCase() + currentValue.slice(1);
                setValue(capitalizedValue === value ? "" : capitalizedValue);
                setOpen(false);
                router.push(
                  pathname +
                    "?" +
                    createQueryString("orderStatus", orderStatus.Delivered)
                );
              }}
            >
              <Check
                className={cn(
                  "mr-4 h-4 w-4",
                  value === orderStatus.Delivered ? "opacity-100" : "opacity-0"
                )}
              />
              {orderStatus.Delivered}
            </CommandItem>
          </>
        )}
      </>
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-28 justify-between overflow-hidden"
        >
          {value ? value : filter}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${filter}...`} />
          <CommandEmpty>No {filter} found.</CommandEmpty>
          <CommandGroup>
            <RenderedFilter />
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SellectForFilter;
