"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { productSchema } from "@/validationschema/user";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useProductCreateQuery,
  useProductUpdateQuery,
} from "@/hooks/use-product-query";
import MultiText from "@/components/multi-text";
import { Textarea } from "@/components/ui/textarea";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import CustomMultiImageIpload from "@/components/multi-image-uploader";
import {
  UseCategoryQuery,
  useCategoryDataQuery,
} from "@/hooks/use-product-category-query";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { multiValueProductForm, ProductForm } from "@/form/form-data";
import axios from "axios";

const UpdateProductForm = ({ productId }) => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedVariants, setSelectedVariants] = useState("");
  const [selectedBrand, setSelectedBrand] = useState();
  const { data: session, status } = useSession();

  const form = useForm({
    // resolver: zodResolver(productSchema),
    defaultValues: async () => {
      const productData = await axios.get(
        `http://localhost:3000/api/product/${productId}`
      );
      setSelectedCategory(productData?.data?.categoryId);
      setSelectedVariants(productData?.data?.variants);
      setSelectedBrand(productData?.data?.brand);
      return {
        _id: productData?.data?._id,
        user: productData?.data?.user,
        productImage: productData?.data?.productImage,
        title: productData?.data?.title,
        size: productData?.data?.size,
        price: productData?.data?.price,
        model: productData?.data?.model,
        color: productData?.data?.color,
        description: productData?.data?.description,
      };
    },
  });

  const {
    mutate: updateProduct,
    isSuccess,
    isLoading,
  } = useProductUpdateQuery();
  const { data: categoryData } = useCategoryDataQuery();

  const selectedCategoryApi = categoryData?.data?.find(
    (category) => category._id === selectedCategory
  )?.categoryName;

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const onSubmit = (formValues) => {
    updateProduct({ productInfo: formValues, id: formValues._id });
  };

  if (isSuccess) {
    router.push("/seller/product");
  }
  const { data: product_category } = UseCategoryQuery();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row gap-5">
          <Card className=" py-10 w-full  md:w-2/5  h-fit flex  flex-col items-center ">
            <FormField
              control={form.control}
              name="productImage"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomMultiImageIpload
                      value={field.value}
                      onChange={(url) => field.onChange([...field.value, url])}
                      onRemove={(url) =>
                        field.onChange([
                          ...field.value.filter((img) => img !== url),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </Card>
          <div className=" w-full md:w-3/5 space-y-8 ">
            <Card className=" grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-7    ">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      defaultValues="Colthing"
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedCategory(value);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={selectedCategoryApi} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {product_category?.data.map((option) => (
                          <SelectItem key={option._id} value={option._id}>
                            {option.categoryName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="variants"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Type</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedVariants(value);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={selectedVariants} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {product_category?.data.map(
                          (option) =>
                            option._id === selectedCategory &&
                            option.variants.map((product) => (
                              <SelectItem
                                key={product._id}
                                value={product.name}
                              >
                                {product.name}
                              </SelectItem>
                            ))
                        )}
                      </SelectContent>
                    </Select>

                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={selectedBrand} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {product_category?.data.map(
                          (option) =>
                            option._id === selectedCategory &&
                            option.variants.map(
                              (product) =>
                                product.name === selectedVariants &&
                                product.brands.map((brand) => (
                                  <SelectItem
                                    key={brand._id}
                                    value={brand.name}
                                  >
                                    {brand.name}
                                  </SelectItem>
                                ))
                            )
                        )}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {ProductForm.map((item) => (
                <FormField
                  key={item.name}
                  control={form.control}
                  name={item.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{item.label}</FormLabel>
                      <FormControl>
                        <Input
                          className="p-3"
                          type={item.type}
                          placeholder={item.placeholder}
                          {...field}
                          onKeyDown={handleKeyPress}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              ))}

              {multiValueProductForm.map((item) => (
                <FormField
                  key={item.name}
                  control={form.control}
                  name={item.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{item.label}</FormLabel>
                      <FormControl>
                        <MultiText
                          placeholder={item.placeholder}
                          type={item.type}
                          value={field.value}
                          onChange={(tag) =>
                            field.onChange([...field.value, tag])
                          }
                          onRemove={(tagToRemove) =>
                            field.onChange([
                              ...field.value.filter(
                                (tag) => tag !== tagToRemove
                              ),
                            ])
                          }
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              ))}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        onKeyDown={handleKeyPress}
                        placeholder="Type your message here."
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </Card>

            <Button className="w-full ml-auto text-xl" type="submit">
              {isLoading ? (
                <AiOutlineLoading3Quarters className=" text-white  animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default UpdateProductForm;
