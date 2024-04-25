"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/store/cart-store";
import useStore from "@/store/use-store";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import Image from "next/image";

const Cart = () => {
  const cart = useStore(useCart, (state) => state);
  // const cart = useCart();

  const total = cart?.cartItems?.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );
  const totalRounded = parseFloat(total?.toFixed(2));

  return (
    <div className="flex gap-20 py-16 px-10 max-lg:flex-col max-sm:px-3">
      <div className="w-2/3 max-lg:w-full">
        <p className="text-xl">Shopping Cart</p>
        <Separator className="my-6" />

        {cart?.cartItems.length === 0 ? (
          <p className=" text-xl">No item in cart</p>
        ) : (
          <div className="flex flex-col gap-3">
            {cart?.cartItems.map((cartItem) => (
              <Card className="w-full flex max-sm:flex-col max-sm:gap-6 hover:bg-card px-4 py-3 items-center max-sm:items-start justify-between">
                <div className="flex items-center">
                  <Image
                    src={cartItem?.item.productImage[0]}
                    width={500}
                    height={500}
                    className="rounded-lg w-32 h-32 object-cover"
                    alt="product"
                  />
                  <div className="flex flex-col gap-3 ml-4">
                    <p className="font-bold">{cartItem.item.title}</p>
                    {cartItem.color && (
                      <p className="text-base">{cartItem.color}</p>
                    )}
                    {cartItem.size && (
                      <p className="text-base">{cartItem.size}</p>
                    )}
                    <p className="text-base">${cartItem.item.price}</p>
                  </div>
                </div>
                <div className="flex gap-10 ">
                  <div className="flex gap-4 items-center">
                    <Button variant="secondary">
                      <MinusCircle
                        className=" cursor-pointer"
                        onClick={() => cart.decreaseQuantity(cartItem.item._id)}
                      />
                    </Button>

                    <p className="font-bold text-lg">{cartItem.quantity}</p>
                    <Button>
                      <PlusCircle
                        className="cursor-pointer"
                        onClick={() => cart.increaseQuantity(cartItem.item._id)}
                      />
                    </Button>
                  </div>
                  <Button variant="destructive">
                    <Trash
                      className="cursor-pointer"
                      onClick={() => cart.removeItem(cartItem.item._id)}
                    />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Card className="w-1/3 max-lg:w-full h-fit lg:mt-11 flex flex-col gap-8 rounded-lg px-4 py-5">
        <p className=" font-bold pb-4">
          Summary
          <span>{`(${cart?.cartItems.length} ${
            cart?.cartItems.length > 1 ? "items" : "item"
          })`}</span>
        </p>
        <div className="flex justify-between text-body-semibold">
          <span>Total Amount</span>
          <span>$ {totalRounded}</span>
        </div>
        <Button className="text-lg hover:bg-primary/20" onClick={{}}>
          Proceed to Checkout
        </Button>
      </Card>
    </div>
  );
};

export default Cart;
