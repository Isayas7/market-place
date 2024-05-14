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
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { discountSchema } from "@/validationschema/user";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const CustomCardSeller = ({
  product,
  aspectRatio,
  className,
  ...props
}) => {
  const { mutate: deactivate, isLoading } = useProoductDeactivateQuery();
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { mutate: promote, isLoading: loading } = usePromotionQuery(
    product.variants
  );

  const form = useForm({
    resolver: zodResolver(discountSchema(product?.price)),
    defaultValues: {
      amount: "",
      expireDate: "",
    },
  });

  const onSubmit = (data) => {
    promote({
      promotionInfo: data,
      id: product._id,
    });
    setDialogOpen(false);
  };

  return (
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
              <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => onSubmit(data))}>
                  <FormField
                    control={form.control}
                    name={"amount"}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input
                            className="p-3"
                            type={"number"}
                            placeholder={"Amount"}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={"expireDate"}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input
                            className="p-3"
                            type={"date"}
                            placeholder={"Date"}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-2 justify-end">
                    <Button
                      className="w-fit mt-4 text-xl bg-red-500"
                      type="button"
                      onClick={() => setDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button className="w-fit mt-4  text-xl" type="submit">
                      {loading ? (
                        <AiOutlineLoading3Quarters className=" text-white  animate-spin" />
                      ) : (
                        "Set"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
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
