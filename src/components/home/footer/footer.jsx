"use client";
import { FlagIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const currentUrl = usePathname();
  return (
    <div
      className={`container mx-auto transition-all duration-300 px-4 border-t border-slate-900/10 dark:border-slate-300/10 flex items-center justify-center ${
        currentUrl === "/" ? "" : "hidden"
      }`}
    >
      <footer className=" ">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div>
              <Link className="flex items-center" href="#">
                <FlagIcon className="h-8 w-auto " />
                <span className="ml-2 text-xl font-bold">Marketplace</span>
              </Link>
              <p className="mt-4 max-w-md text-sm">
                Discover the best products and services in our vibrant
                marketplace.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold">About</h4>
              <nav className="mt-4 space-y-2 flex flex-col">
                <Link className="text-sm hover:underline" href="#">
                  About Us
                </Link>
                <Link className="text-sm hover:underline" href="#">
                  Our Team
                </Link>
                <Link className="text-sm hover:underline" href="#">
                  Our Mission
                </Link>
              </nav>
            </div>
            <div>
              <h4 className="text-lg font-bold">Contact</h4>
              <nav className="mt-4 space-y-2 flex flex-col">
                <Link className="text-sm hover:underline" href="#">
                  Contact Us
                </Link>
                <Link className="text-sm hover:underline" href="#">
                  Support
                </Link>
                <Link className="text-sm hover:underline" href="#">
                  Feedback
                </Link>
              </nav>
            </div>
            <div>
              <h4 className="text-lg font-bold">Legal</h4>
              <nav className="mt-4 space-y-2 flex flex-col">
                <Link className="text-sm hover:underline" href="#">
                  Terms of Service
                </Link>
                <Link className="text-sm hover:underline" href="#">
                  Privacy Policy
                </Link>
                <Link className="text-sm hover:underline" href="#">
                  Cookie Policy
                </Link>
              </nav>
            </div>
          </div>
          <div className="mt-8 border-t border-jade pt-8 text-center text-sm">
            ©2024 Marketplace. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
