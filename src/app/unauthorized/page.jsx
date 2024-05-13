import React from "react";
import Link from "next/link";
const Unauthorized = () => {
  return (
    <div className="flex  w-full flex-col items-center justify-center px-4">
      <div className="max-w-md space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl">
          Access Denied
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          You do not have permission to view this content.
        </p>
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          href="/"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
