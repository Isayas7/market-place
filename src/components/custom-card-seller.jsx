"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";
import { CiMenuKebab } from "react-icons/ci";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card } from "./ui/card";
import {
  usePromotionQuery,
  useProoductDeactivateQuery,
} from "@/hooks/use-product-query";
import { statusData } from "@/utils/permission";
import { useState } from "react";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const CustomCardSeller = ({
  product,
  aspectRatio,
  className,
  ...props
}) => {
  const { mutate: deactivate, isLoading } = useProoductDeactivateQuery();
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [amount, setAmount] = useState(false);
  const [expireDate, setExpireDate] = useState(false);

  const { mutate: promote } = usePromotionQuery(product.variants);

  return (
    // <Link href={`${!open || !dialogOpen ? `/products/${product._id}` : ""}`}>
    <Card
      className={cn(
        "space-y-3 relative rounded-sm overflow-hidden h-full  border-none shadow",
        className
      )}
      {...props}
    >
      <div>
        <Image
          src={product.productImage[0]}
          alt={product.title}
          width={700}
          height={800}
          className={cn(
            "w-full h-full object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </div>

      <div className="space-y-1 text-sm px-2 py-1">
        <h3 className="font-medium leading-none">{product.title}</h3>
        <p className="text-xs text-muted-foreground">{product.price}</p>
      </div>
      <div className="absolute top-0 right-0">
        <DropdownMenu>
          <DropdownMenuTrigger className="p-2">
            <CiMenuKebab className=" text-2xl text-white  bg-transparent/40 hover:bg-transparent/80 rounded-full " />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <Link href={`seller/view/${product._id}`}>
              <DropdownMenuItem>View</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Link href={`product/update/${product._id}`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => setOpen(true)}>
              Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => setDialogOpen(true)}>
              Promotion
            </DropdownMenuItem>
          </DropdownMenuContent>
          <Dialog open={dialogOpen} className="w-fit border-2 border-jade">
            <DialogContent className="flex flex-col dark:bg-mirage-500">
              <DialogTitle>Put Discount percentage and expire date</DialogTitle>
              <Separator />
              Amount
              <Input
                placeholder="Discount amount"
                autoComplete="off"
                type="number"
                autoFocus
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
              Expire Date
              <Input
                placeholder="Expire Date"
                autoComplete="off"
                type="date"
                autoFocus
                onChange={(e) => {
                  setExpireDate(e.target.value);
                }}
              />
              <div className=" flex gap-2 justify-end">
                <Button
                  className="bg-red-500"
                  onClick={() => {
                    setDialogOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    promote({
                      promotionInfo: {
                        amount,
                        expireDate: expireDate,
                      },
                      id: product._id,
                    });

                    setDialogOpen(false);
                  }}
                >
                  Set
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {product.status === statusData.Active
                    ? " Are you sure do you want to deactivate this product?"
                    : " Are you sure do you want to activate this product?"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently deactivate
                  this account and hide some data from our products.
                  {product.status === statusData.Active
                    ? "  This action cannot be undone. This will  deactivate" +
                      "this account and hide some data from our products."
                    : "  This action cannot be undone. This will  activate" +
                      "this account and unhide some data to our products."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deactivate(product._id)}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenu>
      </div>
    </Card>
    // </Link>
  );
};
