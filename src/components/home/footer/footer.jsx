"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const currentUrl = usePathname();

  return (
    <div
      className={`container mx-auto transition-all duration-300 px-4 flex items-center justify-center ${
        currentUrl.includes("/dashboard") ? "hidden" : ""
      }`}
    >
      Footer
    </div>
  );
};

export default Footer;
