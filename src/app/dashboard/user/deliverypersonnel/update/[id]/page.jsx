"use client";

import React from "react";
import dynamic from "next/dynamic";

const UpdateDeliveryPersonnelForm = dynamic(
  () => import("@/components/dashboard/user/update-dp-form"),
  {
    ssr: false,
  }
);

const UpdateUser = ({ params }) => {
  return (
    <div>
      <div className="mb-2">
        <div className="text-xl my-2 font-bold ">Personnel Delivery Update</div>
      </div>
      <UpdateDeliveryPersonnelForm userId={params.id} />
    </div>
  );
};

export default UpdateUser;
