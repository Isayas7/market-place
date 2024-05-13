"use client";
import { Price } from "@/components/products/productdetail/Price";
import { ProductDesc } from "@/components/products/productdetail/ProductDesc";
import { ProductImage } from "@/components/products/productdetail/ProductImage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";

import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { UseSingleProductQuery } from "@/hooks/use-product-query";
import {
  UseProductReviewQuery,
  useProductReviewCreate,
} from "@/hooks/use-product-rating";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import { Separator } from "@/components/ui/separator";
import ReviewUpdateForm from "@/components/products/review-update-form";

const Review = () => {
  const [openForm, setOpenForm] = useState(false);
  const sesssin = useSession();
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const { data: product, isLoading } = UseSingleProductQuery(id);
  const { mutate: reveiwProduct, data, isSuccess } = useProductReviewCreate(id);
  const { data: reveiwProductData } = UseProductReviewQuery(id);
  const { toast } = useToast();

  const form = useForm({
    // resolver: zodResolver(productSchema),
    defaultValues: {
      comment: "",
      star: "",
    },
  });

  const onSubmit = (formValues) => {
    formValues.userId = sesssin?.data?.user.id;
    formValues.productId = product?.data?._id;
    reveiwProduct(formValues);
  };

  useEffect(() => {
    if (isSuccess && data?.data === "Already Reviewed") {
      toast({
        title: "Already Reviewed",
        description: "You have already reviewed this product.",
        action: <ToastAction altText="Goto schedule to undo">Ok</ToastAction>,
      });
      form.reset();
    } else if (isSuccess && data?.data === "Review Submitted") {
      toast({
        title: "Review Submitted",
        description: "Thank you for your review!",
        action: <ToastAction altText="Goto schedule to undo">Ok</ToastAction>,
      });
      form.reset();
    }
  }, [isSuccess]);

  const containsUserId = (data, userId) => {
    return data?.some((item) => item.userId === userId);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-10  ">
        <div className="md:sticky top-20 self-start w-full   md:w-6/12 lg:w-5/12 xl:w-4/12 flex gap-6">
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
      <section className="flex flex-col lg:flex-row gap-5 bg-gray-100 dark:bg-gray-800 my-2 py-10 px-2">
        <Card className=" p-4 w-5/6 mx-auto lg:w-2/6 h-fit">
          <div className="flex gap-3 items-center">
            <ReactStars
              count={5}
              value={parseInt(product?.data?.averageStar)}
              edit={false}
              size={24}
              activeColor="#ffd700"
            />

            <span>{product?.data?.averageStar} out of 5</span>
          </div>
          <span>{product?.data?.ratingCount} global ratings</span>

          <div className="flex flex-col gap-3 mt-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex gap-3 items-center w-full">
                <span className="text-nowrap">{rating} star</span>
                <Progress
                  value={product?.data?.ratingPercentages[rating] || 0}
                  className="w-[70%] bg-slate-400"
                />
                <span>{`${
                  product?.data?.ratingPercentages[rating] || 0
                }%`}</span>
              </div>
            ))}
          </div>
        </Card>
        <section className=" flex flex-col gap-5">
          {!containsUserId(
            reveiwProductData?.data,
            sesssin?.data?.user?.id
          ) && (
            <div className="w-5/6  mx-auto flex flex-col items-center justify-center space-y-4 pt-6 ">
              <div className="text-center">
                <h2 className="text-3xl font-bold  sm:text-5  ">
                  Write a Review
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Share your thoughts on the {" " + product?.data.title}.
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full space-y-5"
                >
                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
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
                  <FormField
                    control={form.control}
                    name="star"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-3">
                        <FormLabel className="mt-2 text-xl">
                          Select rate number :
                        </FormLabel>
                        <FormControl>
                          <ReactStars
                            {...field}
                            count={5}
                            size={24}
                            activeColor="#ffd700"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="mt-4">
                    Post review
                  </Button>
                </form>
              </Form>
            </div>
          )}

          <Separator />
          <div className="w-5/6  mx-auto my-5 ">
            <div className="text-center">
              <h2 className="text-3xl font-bold sm:text-5xl">
                Customer Reviews
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                See what our customers have to say about the
                {" " + product?.data.title}.
              </p>
            </div>
          </div>

          <Separator />
          <div className="w-5/6  mx-auto my-5 ">
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
                    </div>
                    <ReactStars
                      count={5}
                      value={parseInt(review?.star)}
                      size={24}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p>{review?.comment}</p>
                    {review?.userId === sesssin?.data?.user?.id && !openForm ? (
                      <Button
                        variant="link"
                        onClick={() => setOpenForm(!openForm)}
                      >
                        Edit your review
                      </Button>
                    ) : review?.userId === sesssin?.data?.user?.id &&
                      openForm ? (
                      <ReviewUpdateForm
                        review={review}
                        setOpenForm={setOpenForm}
                        openForm={openForm}
                      />
                    ) : (
                      ""
                    )}
                  </>
                ))}
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Review;
