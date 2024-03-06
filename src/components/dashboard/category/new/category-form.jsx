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
import { useRouter } from "next/navigation";
import { categorySchema } from "@/schema/user";
import { useCategoryRegisterQuery } from "@/hooks/use-product-category-query";

const CategoryForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      categoryName: "",
      categoryImage: undefined,
      productNames: "",
    },
  });

  const {
    mutate: registerCategory,
    isSuccess,
    isLoading,
  } = useCategoryRegisterQuery();

  const onSubmit = async (formValues) => {
    console.log(formValues.productNames);

    const formData = new FormData();
    for (const key in formValues) {
      formData.append(key, formValues[key]);
    }
    formData.append("selectedImage", selectedImage);
    console.log(formData);
    registerCategory(formData);

    // router.push("/dashboard/user");
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
                  name="categoryName"
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
                          placeholder="Enter product names separated by commas"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Card className=" w-full md:w-full p-4 ">
                <CardContent className="flex items-center justify-center">
                  <FormField
                    control={form.control}
                    name="categoryImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Button
                            className="size-28 rounded-full  flex-col justify-center items-center "
                            type="button"
                          >
                            <input
                              type="file"
                              className="hidden"
                              id="fileInput"
                              onBlur={field.onBlur}
                              name={field.name}
                              onChange={(e) => {
                                field.onChange(e.target.files);
                                setSelectedImage(e.target.files?.[0] || null);
                              }}
                              ref={field.ref}
                            />
                            <label
                              htmlFor="fileInput"
                              className=" flex flex-col justify-center items-center "
                            >
                              <FaCloudUploadAlt className="size-8" />
                              <p className="text-xs">upload photo</p>
                            </label>
                          </Button>
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
