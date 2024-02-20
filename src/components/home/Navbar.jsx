"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../themeprovider/mode-toggle";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const currentUrl = usePathname();
  const session = useSession();

  const links = [
    {
      id: 1,
      title: "Home",
      url: "/",
    },
    {
      id: 3,
      title: "Blog",
      url: "/blog",
    },
    {
      id: 4,
      title: "About",
      url: "/about",
    },
    {
      id: 5,
      title: "Contact",
      url: "/contact",
    },
    {
      id: 6,
      title: session.status === "authenticated" ? "Dashboard" : "Login",
      url: session.status === "authenticated" ? "/dashboard" : "/login",
    },
  ];
  return (
    <div
      className={`flex justify-between container mx-auto transition-all duration-300 px-4 ${
        currentUrl.includes("/dashboard") ? "hidden" : ""
      }`}
    >
      <Link href="/">OMP</Link>
      <div className="flex gap-4">
        {links.map((link) => (
          <Link key={link.id} href={link.url}>
            {link.title}
          </Link>
        ))}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
