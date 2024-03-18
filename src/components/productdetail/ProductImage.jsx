import Image from "next/image";
import Link from "next/link";
import React from "react";

export const ProductImage = () => {
  return (
    <>
      <div className=" w-[80%]  md:w-full  overflow-hidden rounded-md ">
        <Image
          src={
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={"product"}
          width={250}
          height={330}
          className={"  w-full h-full   object-cover aspect-[3/4]"}
        />
      </div>
      <div className="flex flex-col gap-5 items-start  ">
        <Link
          href={""}
          className="flex  items-center space-y-1 p-1 hover:bg-slate-600 hover:rounded-md"
        >
          <Image
            src={"/toyota.png"}
            alt=";;"
            width={250}
            height={330}
            className="aspect-square size-12 rounded-md  "
          />
        </Link>
        <Link
          href={""}
          className="flex  items-center space-y-1 p-1 hover:bg-slate-600 hover:rounded-md"
        >
          <Image
            src={
              "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt=";;"
            width={250}
            height={330}
            className="aspect-square size-12 rounded-md  "
          />
        </Link>
        <Link
          href={""}
          className="flex  items-center space-y-1 p-1 hover:bg-slate-600 hover:rounded-md"
        >
          <Image
            src={"/toyota.png"}
            alt=";;"
            width={250}
            height={330}
            className="aspect-square size-12 rounded-md  "
          />
        </Link>
        <Link
          href={""}
          className="flex  items-center space-y-1 p-1 hover:bg-slate-600 hover:rounded-md"
        >
          <Image
            src={"/toyota.png"}
            alt=";;"
            width={250}
            height={330}
            className="aspect-square size-12 rounded-md  "
          />
        </Link>
        <Link
          href={""}
          className="flex  items-center space-y-1 p-1 hover:bg-slate-600 hover:rounded-md"
        >
          <Image
            src={"/toyota.png"}
            alt=";;"
            width={250}
            height={330}
            className="aspect-square size-12 rounded-md  "
          />
        </Link>
      </div>
    </>
  );
};
