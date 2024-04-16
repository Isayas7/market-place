import Link from "next/link";
import React from "react";
import { Separator } from "../ui/separator";

export const ProductDesc = ({ descriptions }) => {
  return (
    <div className=" flex flex-col">
      <h3 className="text-3xl">{descriptions?.productName}</h3>
      <Link href={""}>
        <span className=" hover:border-b-2 inline"> Visit Jw store</span>
      </Link>
      <Separator className="my-2" />
      <div className="grid grid-cols-2 gap-3">
        {descriptions?.brand && (
          <>
            <p className="font-bold">Brand</p>
            <p>{descriptions?.brand}</p>
          </>
        )}
        {descriptions?.color && (
          <>
            <p className="font-bold">Color</p>

            <p className="flex gap-2 items-center">
              {descriptions?.color.map((color, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <span>{color}</span>
                  <span className=" border-r-[0.5px] h-4" />
                </div>
              ))}
            </p>
          </>
        )}
        {descriptions?.brand && (
          <>
            <p className="font-bold">Brand</p>
            <p>{descriptions?.brand}</p>
          </>
        )}
        {descriptions?.model && (
          <>
            <p className="font-bold">Model</p>
            <p>{descriptions?.model}</p>
          </>
        )}

        {descriptions?.size && (
          <>
            <p className="font-bold">Size</p>

            <p className="flex gap-2 items-center">
              {descriptions?.size.map((size, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <span>{size}</span>
                  <span className=" border-r-[0.5px] h-4" />
                </div>
              ))}
            </p>
          </>
        )}
      </div>
      <Separator className="my-2" />
      <p className="font-bold text-xl">Description</p>
      <p className="text-lg">{descriptions?.description}</p>
    </div>
  );
};
