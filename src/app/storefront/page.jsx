"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";

const StorefrontForm = dynamic(
  () => import("@/components/storefront/storefront-form"),
  {
    ssr: false,
  }
);

const Storefront = () => {
  return (
    <div className="overflow-y-scroll">
      <div>
        <Image
          src={"/icon.png"}
          alt="logo"
          width={100}
          height={100}
          className="mx-auto h-12 w-auto"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
          Become a Seller
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join our Marketplace platform and start selling your products today.
        </p>
      </div>
      <div className="text-xl p-2 text-center text-gray-600">
        Fill the following form properly to become seller this information will
        be reviewed and approved by admin
      </div>
      <StorefrontForm />
    </div>
  );
};

export default Storefront;
