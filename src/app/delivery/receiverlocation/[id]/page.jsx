"use client";

import { Button } from "@/components/ui/button";
import { useSingleOrderQuery } from "@/hooks/use-order-query";
import { useSingleUserQuery } from "@/hooks/use-users-query";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Location = dynamic(() => import("@/components/map/location"), {
  ssr: false,
});

const ReceiverLocation = ({ params }) => {
  const session = useSession();

  const { data: order } = useSingleOrderQuery(params?.id);
  const { data: user } = useSingleUserQuery(session?.data?.user?.id);
  if (!user || !order) {
    return (
      <AiOutlineLoading3Quarters className="text-5xl w-full text-center text-jade animate-spin" />
    );
  }

  return (
    <div>
      <header className="bg-gray-100 dark:bg-gray-800 px-6 py-4 shadow">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Receiver Location</h1>

            <Button>{order?.data?.receiverInformation?.address}</Button>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">
              Receiver Location from Your Default Location
            </h1>
            <Button>{order?.data?.shippingPrice / 5} KM</Button>
            Red circle is your default address
          </div>
        </div>
      </header>
      {order && user && (
        <Location
          userOneLocation={user?.data?.location}
          userTwoLocation={order?.data?.receiverInformation?.location}
          popMessage={"Receiver Location"}
        />
      )}
    </div>
  );
};

export default ReceiverLocation;
