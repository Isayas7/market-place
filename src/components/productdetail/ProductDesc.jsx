import Link from "next/link";
import React from "react";
import { Separator } from "../ui/separator";

export const ProductDesc = () => {
  return (
    <div className=" flex flex-col">
      <h3 className="text-3xl">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut, quod
        laboriosam!
      </h3>
      <Link href={""}>
        <span className=" hover:border-b-2 inline"> Visit Jw store</span>
      </Link>
      <Separator className="my-2" />
      <div className="grid grid-cols-2 gap-3">
        <p className="font-bold">Brand</p>
        <p>HyperX</p>
        <p className="font-bold">Color</p>
        <p> Black</p>
        <p className="font-bold">Model</p>
        <p> Cloud III Black</p>
        <p className="font-bold">Size</p>
        <p>xxl</p>
        <p className="font-bold">Brand</p>
        <p>Brand</p>
      </div>
      <Separator className="my-2" />
      <p className="font-bold text-xl">Description</p>
      <p className="text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem suscipit
        autem voluptate corporis sunt nesciunt fugit, voluptates minus,
        recusandae non quod perspiciatis quis! Delectus, impedit saepe quo ea
        obcaecati et!
      </p>
    </div>
  );
};
