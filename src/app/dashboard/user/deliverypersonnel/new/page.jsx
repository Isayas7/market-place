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
import { Button } from "@/components/ui/button";

const NewDeliveryPersonnelForm = dynamic(
  () => import("@/components/dashboard/user/new-dp-form"),
  {
    ssr: false,
  }
);

const NewUser = () => {
  return (
    <div className="pb-2 overflow-y-visible">
      <div className="mb-2">
        <div className="text-xl my-2 font-bold ">
          Personnel Delivery Creation
        </div>
      </div>
      <NewDeliveryPersonnelForm />
    </div>
  );
};

export default NewUser;
