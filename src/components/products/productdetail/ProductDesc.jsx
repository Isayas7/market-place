import Link from "next/link";
import React, { useState } from "react";
import { Separator } from "../../ui/separator";
import { Button } from "@/components/ui/button";
import { GoPlus } from "react-icons/go";
import { FaMinus } from "react-icons/fa6";
import { useCart } from "@/store/cart-store";
import useStore from "@/store/use-store";
import ReactStars from "react-rating-stars-component";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Progress } from "@/components/ui/progress";
import { IoChevronForwardSharp } from "react-icons/io5";
import { useProductUpdateQuery } from "@/hooks/use-product-query";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useProductRatingCreate } from "@/hooks/use-product-rating";
import { useSession } from "next-auth/react";

export const ProductDesc = ({ descriptions }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSlectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();

  const sassion = useSession();

  const cart = useStore(useCart, (state) => state);

  const form = useForm({
    // resolver: zodResolver(productSchema),
    defaultValues: {
      star: "",
      postedBy: "",
    },
  });

  const myRate = descriptions?.ratings.find(
    (rate) => rate.postedBy.toString() === sassion?.data?.user.id
  );

  const {
    mutate: rateProduct,
    isSuccess,
    isLoading,
  } = useProductRatingCreate();

  const onSubmit = (formValues) => {
    formValues.postedBy = sassion?.data?.user?.id;
    rateProduct({
      rateInfo: formValues,
      id: descriptions._id,
    });
  };
  if (descriptions?.averageStar) {
    return (
      <div className=" flex flex-col">
        <h3 className="text-3xl">{descriptions?.title}</h3>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <ReactStars
                  count={5}
                  value={descriptions?.averageStar}
                  size={24}
                  edit={false}
                  activeColor="#ffd700"
                />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className=" p-4 md:w-[400px]  ">
                  <div className="flex gap-3 items-center">
                    <ReactStars
                      count={5}
                      value={descriptions?.averageStar}
                      size={24}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <span>{descriptions?.averageStar} out of 5</span>
                  </div>
                  <span>{descriptions?.ratings?.length} global ratings</span>
                  <div className="flex flex-col gap-3 mt-3">
                    <div className="flex gap-3 items-center w-full">
                      <span>5 star</span>
                      <Progress
                        value={descriptions?.starFive || 0}
                        className="w-[70%] bg-slate-400 "
                      />
                      <span>{`${descriptions?.starFive || 0}%`}</span>
                    </div>

                    <div className="flex gap-3 items-center w-full">
                      <span>4 star</span>
                      <Progress
                        value={descriptions?.starFour || 0}
                        className="w-[70%]  bg-slate-400"
                      />
                      <span>{`${descriptions?.starFour || 0}%`}</span>
                    </div>
                    <div className="flex gap-3 items-center w-full">
                      <span>3 star</span>
                      <Progress
                        value={descriptions?.starThree}
                        className="w-[70%]  bg-slate-400"
                      />
                      <span> {`${descriptions?.starThree || 0}%`}</span>
                    </div>
                    <div className="flex gap-3 items-center w-full">
                      <span>2 star</span>
                      <Progress
                        value={descriptions?.starTwo}
                        className="w-[70%]  bg-slate-400"
                      />
                      <span> {`${descriptions?.starTwo || 0}%`}</span>
                    </div>
                    <div className="flex gap-3 items-center w-full">
                      <span>1 star</span>
                      <Progress
                        value={descriptions?.starOne}
                        className="w-[70%]  bg-slate-400"
                      />
                      <span> {`${descriptions?.starOne || 0}%`}</span>
                    </div>
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
        <p className="font-bold text-xl">Rate this product</p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex justify-between items-center"
          >
            <FormField
              control={form.control}
              name="star"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ReactStars
                      {...field}
                      count={5}
                      value={myRate?.star}
                      size={24}
                      activeColor="#ffd700"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>

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
  }
};
