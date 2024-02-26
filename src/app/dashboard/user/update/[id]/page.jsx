"use client";

import UpdateDeliveryPersonnelForm from "@/components/dashboard/user/update-dp-form";
import React from "react";

const UpdateUser = ({ params }) => {
  return (
    <div>
      <UpdateDeliveryPersonnelForm userId={params.id} />
    </div>
  );
};

export default UpdateUser;
