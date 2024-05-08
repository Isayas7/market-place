"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
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
        <div className="text-xl my-2 font-bold "> User Update</div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link href="/dashboard/user">User</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>User Update</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <UpdateDeliveryPersonnelForm userId={params.id} />
    </div>
  );
};

export default UpdateUser;
