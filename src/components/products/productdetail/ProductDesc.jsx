import Link from "next/link";
import React, { useEffect, useState } from "react";
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
import { useSession } from "next-auth/react";
import formatDate from "@/utils/formatDate";
import { useToast } from "@/components/ui/use-toast";

export const ProductDesc = ({ descriptions }) => {
  const session = useSession();
  const { toast } = useToast();

  const pathname = usePathname();
  const pathArray = pathname.split("/");
  const lastPath = pathArray[pathArray.length - 1];

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSlectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();

  const [isExisting, setIsExisting] = useState(false);
  const [isClciked, setIsClciked] = useState(false);

  const cart = useStore(useCart, (state) => state);

  const isEligible = isCurrentUserEligibleForDiscount(
    descriptions?.discount,
    session?.data?.user?.id
  );

  // to get discount
  const discount = isEligible
    ? descriptions?.discount?.find(
        (discount) =>
          discount.userId === session?.data?.user?.id &&
          new Date(discount.expireDate) > new Date()
      )?.amount || 0
    : 0;
  const promotionalDiscount =
    new Date(descriptions?.promotion?.expireDate) > new Date()
      ? descriptions?.promotion?.amount
      : 0;

  const handleAddItem = (product) => {
    const exist = cart?.cartItems?.some(
      (cartItem) => cartItem?.item?._id === product?._id
    );
    setIsExisting(exist);
    exist && setIsClciked(!isClciked);
  };

  useEffect(() => {
    isExisting &&
      isClciked &&
      toast({
        className: " border-2 text-white bg-[#FFCC00]",
        description:
          "Item exists in the cart. Go to the cart to increase quantity.",
      });
  }, [isExisting, isClciked]);

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
      {isEligible && (
        <>
          <Separator className="my-2" />
          <Button className="w-fit bg-red-500">Limited time deal</Button>

          <div className="text-lg font-medium text-gray-500  dark:text-gray-400">
            Bundle List Price:
            <span className="line-through">
              {descriptions?.price - promotionalDiscount} ETB
            </span>
          </div>
          <p>
            Deal Price: {descriptions?.price - promotionalDiscount - discount}
            ETB
          </p>
          <p>
            You Save: {discount} ETB
            {"(" +
              calculateDiscountPercentage(
                descriptions?.price - promotionalDiscount,
                discount
              ).toFixed(0) +
              "%)"}
          </p>
        </>
      )}
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
        onClick={() => {
          const { price, ...others } = descriptions;
          const lastPrice = descriptions.price - promotionalDiscount - discount;
          const cartDescription = { price: lastPrice, ...others };
          cart.addItem({
            item: cartDescription,
            quantity,
            color: selectedColor,
            size: selectedSize,
          });

          handleAddItem(cartDescription);
        }}
      >
        Add to cart
      </Button>
    </div>
  );
};

function isCurrentUserEligibleForDiscount(discounts, currentUser) {
  return discounts?.some(
    (discount) =>
      discount.userId === currentUser &&
      new Date(discount.expireDate) > new Date()
  );
}
function calculateDiscountPercentage(originalPrice, discountAmount) {
  return (discountAmount / originalPrice) * 100;
}
