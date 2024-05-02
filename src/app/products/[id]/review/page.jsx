"use client";
import { Price } from "@/components/products/productdetail/Price";
import { ProductDesc } from "@/components/products/productdetail/ProductDesc";
import { ProductImage } from "@/components/products/productdetail/ProductImage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseSingleProductQuery } from "@/hooks/use-product-query";
import {
  UseProductReviewQuery,
  useProductReviewCreate,
} from "@/hooks/use-product-rating";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { HiDotsVertical } from "react-icons/hi";
import ReactStars from "react-rating-stars-component";

const Review = () => {
  const sesssin = useSession();
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const { data: product, isLoading } = UseSingleProductQuery(id);
  const { mutate: reveiwProduct } = useProductReviewCreate(id);
  const { data: reveiwProductData } = UseProductReviewQuery(id);

  const form = useForm({
    // resolver: zodResolver(productSchema),
    defaultValues: {
      comment: "",
    },
  });

  console.log("reveiwProductData", reveiwProductData?.data);

  const onSubmit = (formValues) => {
    formValues.userId = sesssin?.data.user.id;
    formValues.productId = product?.data._id;
    reveiwProduct(formValues);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-10  ">
        <div className="md:sticky top-20 self-start w-10/12   md:w-6/12 lg:w-5/12 xl:w-4/12 flex flex-col gap-6">
          <ProductImage images={product?.data.productImage} />
        </div>

        <div className="  flex flex-col lg:flex-row gap-6 w-full md:w-6/12 lg:w-7/12 xl:w-8/12 ">
          <div className="w-full lg:w-8/12">
            <ProductDesc descriptions={product?.data} />
          </div>
          <div className="w-full lg:w-[340px]  ">
            <Price price={product?.data.price} />
          </div>
        </div>
      </div>
      <div className=" mt-6  w-6/12 mx-auto">
        <h3 className="text-2xl text-center">Customer reviews</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl">Rate this product</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-40"
                      {...field}
                      placeholder="Type your review here."
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-4">
              Post review
            </Button>
          </form>
        </Form>
        <div className="mt-4">
          {reveiwProductData?.data &&
            reveiwProductData?.data?.map((review) => (
              <>
                <div className="flex justify-between mt-3">
                  <div className="flex gap-5">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={review?.profileImage} alt="man" />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-center  ">
                      <span>
                        {review?.firstName} {review?.lastName}
                      </span>
                      <span>4 months ago</span>
                    </div>
                    <span>Verified Purchase ✔</span>
                  </div>
                  <HiDotsVertical />
                </div>
                <ReactStars
                  count={5}
                  value={review?.star}
                  size={24}
                  edit={false}
                  activeColor="#ffd700"
                />
                <p>{review?.comment}</p>
              </>
            ))}
        </div>
      </div>
    </>
  );
};

export default Review;
