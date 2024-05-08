import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const OrderSkeleton = () => {
  return (
    <>
      <div className="grid gap-6">
        <div className="border shadow-sm rounded-lg p-4">
          <div className="grid gap-4">
            <Skeleton className="h-6 w-[200px]" />
            <div className="grid gap-2">
              <Skeleton className="h-4 w-[300px]" />
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[280px]" />
            </div>
          </div>
        </div>
        <div className="border shadow-sm rounded-lg p-4">
          <div className="grid gap-4">
            <Skeleton className="h-6 w-[200px]" />
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border shadow-sm rounded-lg p-4 flex justify-end mt-2">
        <Skeleton className="h-10 w-[150px]" />
      </div>
      <div className="border shadow-sm rounded-lg p-4 mt-2">
        <div className="grid gap-4">
          <Skeleton className="h-6 w-[200px]" />
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSkeleton;
