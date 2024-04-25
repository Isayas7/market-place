"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";

const AuthProvider = ({ children, session }) => {
  const pathname = usePathname();
  if (typeof localStorage !== "undefined") {
    if (!pathname.includes("/dashboard/user")) {
      localStorage.removeItem("tab");
    }
  }
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
