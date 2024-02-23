import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useDPRegisterQuery } from "@/hooks/use-users-query";
import { useRouter } from "next/navigation";
import { categorySchema } from "@/schema/user";

const CategoryForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      categoryName: "",
      image: undefined,
    },
  });

  const { mutate: registerDP, isSuccess, isLoading } = useDPRegisterQuery();

  const onSubmit = (values) => {
    registerDP(values);
    router.push("/dashboard/category");
  };

  return (
    <div className="flex flex-col md:flex-row gap-5">
      <div className=" w-full md:w-3/5 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card className=" grid grid-cols-1 sm:grid-cols-2 sm:gap-5 p-7">
              <div>
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input
                          className="p-3"
                          placeholder="category name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="productNames"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Names</FormLabel>
                      <FormControl>
                        <Input
                          className="p-3"
                          placeholder="product names"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Card className=" w-full md:w-full ">
                <CardContent className="flex items-center justify-center">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className=" flex justify-center items-center p-3 rounded-full   border  dark:border-gray-600 border-dashed">
                            <Button className="size-28 rounded-full  flex-col justify-center items-center ">
                              <div>
                                <FaCloudUploadAlt className="size-8" />
                              </div>
                              <p className="text-xs">upload photo</p>
                            </Button>
                          </div>
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="p-3"
                            type="file"
                            placeholder="Id card"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </Card>

            <Button
              disabled={isLoading}
              className="w-full ml-auto text-xl"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CategoryForm;
