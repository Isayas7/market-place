"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrderQuery, useSingleOrderQuery } from "@/hooks/use-order-query";
import { useProductQuery } from "@/hooks/use-product-query";
import { useSingleUserQuery } from "@/hooks/use-users-query";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Location = dynamic(() => import("@/components/map/location"), {
  ssr: false,
});

const SellerLocation = () => {
  const session = useSession();

  const { data: product } = useProductQuery();
  const { data: user } = useSingleUserQuery(session?.data?.user?.id);

  const { data: seller } = useSingleUserQuery(product?.data[0]?.user);

  if (!user || !seller || !product) {
    return (
      <AiOutlineLoading3Quarters className="text-5xl w-full text-center text-jade animate-spin" />
    );
  } else {
    return (
      <div>
        <header className="bg-gray-100 dark:bg-gray-800 px-6 py-4 shadow">
          <div className="container mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Seller Address</h1>

              <p className="text-gray-500 dark:text-gray-400">
                {seller?.data?.firstName + " " + seller?.data?.middleName}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                {seller?.data?.address}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                {seller?.data?.phoneNumber}
              </p>
              <Button>Contact Seller</Button>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold">
                Seller Location from Your Default Location
              </h1>
              <Button>
                {Number(
                  calculateDistance(
                    user?.data?.location[0],
                    user?.data?.location[1],
                    seller?.data?.location[0],
                    seller?.data?.location[1]
                  ).toFixed(3)
                )}
                KM
              </Button>
              Red circle is your default address
            </div>
          </div>
        </header>
        {seller && user && (
          <Location
            userOneLocation={user?.data?.location}
            userTwoLocation={seller?.data?.location}
            popMessage={"Seller Location"}
          />
        )}
      </div>
    );
  }
};

export default SellerLocation;

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
