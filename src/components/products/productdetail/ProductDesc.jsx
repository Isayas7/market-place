import Link from "next/link";
import React, { useState } from "react";
import { Separator } from "../../ui/separator";
import { Button } from "@/components/ui/button";
import { GoPlus } from "react-icons/go";
import { FaMinus } from "react-icons/fa6";
import { useCart } from "@/store/cart-store";
import useStore from "@/store/use-store";

export const ProductDesc = ({ descriptions }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSlectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("xl");

  const cart = useStore(useCart, (state) => state);

  return (
    <div className=" flex flex-col">
      <h3 className="text-3xl">{descriptions?.title}</h3>
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
      <Separator className="my-2" />
      <div className="flex gap-5 items-center my-2">
        <Button
          variant="outline"
          onClick={() => quantity > 1 && setQuantity(quantity - 1)}
        >
          <FaMinus className="size-6" />
        </Button>

        <span className="text-2xl">{quantity}</span>
        <Button variant="outline" onClick={() => setQuantity(quantity + 1)}>
          <GoPlus className="size-6" />
        </Button>
      </div>
      <Button
        onClick={() =>
          cart.addItem({
            item: descriptions,
            quantity,
            color: selectedColor,
            size: selectedSize,
          })
        }
      >
        Add to cart
      </Button>
    </div>
  );
};
