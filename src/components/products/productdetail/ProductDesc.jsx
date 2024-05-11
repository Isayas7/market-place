import Link from "next/link";
import React, { useState } from "react";
import { Separator } from "../../ui/separator";
import { Button } from "@/components/ui/button";
import { GoPlus } from "react-icons/go";
import { FaMinus } from "react-icons/fa6";
import { useCart } from "@/store/cart-store";
import useStore from "@/store/use-store";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Progress } from "@/components/ui/progress";
import { IoChevronForwardSharp } from "react-icons/io5";
import ReactStars from "react-rating-stars-component";
import { usePathname } from "next/navigation";

export const ProductDesc = ({ descriptions }) => {
  const pathname = usePathname();
  const pathArray = pathname.split("/");
  const lastPath = pathArray[pathArray.length - 1];

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSlectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();

  const cart = useStore(useCart, (state) => state);

  return (
    <div className=" flex flex-col">
      <h3 className="text-3xl">{descriptions?.title}</h3>
      {lastPath === "review" ? (
        ""
      ) : (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <ReactStars
                  count={5}
                  value={descriptions?.averageStar}
                  edit={false}
                  size={24}
                  activeColor="#ffd700"
                />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className=" p-4 md:w-[400px]  ">
                  <div className="flex gap-3 items-center">
                    <ReactStars
                      count={5}
                      value={descriptions?.averageStar}
                      edit={false}
                      size={24}
                      activeColor="#ffd700"
                    />

                    <span>{descriptions?.averageStar} out of 5</span>
                  </div>
                  <span>{descriptions?.ratingCount} global ratings</span>

                  <div className="flex flex-col gap-3 mt-3">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div
                        key={rating}
                        className="flex gap-3 items-center w-full"
                      >
                        <span>{rating} star</span>
                        <Progress
                          value={descriptions?.ratingPercentages[rating] || 0}
                          className="w-[70%] bg-slate-400"
                        />
                        <span>{`${
                          descriptions?.ratingPercentages[rating] || 0
                        }%`}</span>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex justify-center items-center">
                      <Link
                        href={`${descriptions?._id}/review`}
                        className="hover:border-b-2 inline w-fit cursor-pointer"
                      >
                        See customer reviews
                      </Link>
                      <IoChevronForwardSharp />
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}

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
                  <Button
                    variant={`${selectedColor === color ? "" : "outline"}`}
                    size="sm"
                    onClick={() => setSlectedColor(color)}
                  >
                    {color}
                  </Button>
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
                  <Button
                    variant={`${selectedSize === size ? "" : "outline"}`}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
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
