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
import { useRouter } from "next/navigation";
import { categorySchema } from "@/validationschema/user";
import { useCategoryUpdateQuery } from "@/hooks/use-product-category-query";
import CustomSingleImageIpload from "@/components/single-image-uploader";
import axios from "axios";

const CategoryUpdateForm = ({ categoryId }) => {
  const router = useRouter();

  const [selectedImages, setSelectedImages] = useState([]);
  const [textFields, setTextFields] = useState([{ id: 0, isDefault: true }]);
  const {
    mutate: updateCategory,
    isSuccess,
    isLoading,
  } = useCategoryUpdateQuery();

  const form = useForm({
    // resolver: zodResolver(categorySchema),
    defaultValues: async () => {
      const categoryData = await axios.get(
        `http://localhost:3000/api/productcatagory/${categoryId}`
      );
      return {
        _id: categoryData?.data?._id,
        user: categoryData?.data?.user,
        categoryName: categoryData?.data?.categoryName,
        categoryImage: categoryData?.data?.categoryImage,
        variants: categoryData?.data?.variants?.map((type) => ({
          name: type.name,
          image: type.image,
        })),
      };
    },
  });

  const addTextField = () => {
    const defaultValues = form.getValues();
    setTextFields((prevTextFields) => [
      ...prevTextFields,
      { id: prevTextFields.length, isDefault: false, defaultValues },
    ]);
  };

  // Function to remove a set of text fields
  const removeTextFields = (index) => {
    const updatedFields = [...textFields];
    updatedFields.splice(index, 1);
    setTextFields(updatedFields);
    // Remove the corresponding default value
    const updatedDefaultValues = { ...form.getValues() };
    updatedDefaultValues.variants.splice(index, 1);
    form.reset(updatedDefaultValues);
  };

  const addImageField = () => {
    setSelectedImages([...selectedImages, null]);
  };

  const removeImageField = () => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(-1, 1);
    setSelectedImages(updatedImages);
  };

  const onSubmit = (formValues) => {
    updateCategory({ categoryInfo: formValues, id: formValues._id });
  };

  if (isSuccess) {
    router.push("/dashboard/category");
  }

  return (
    <div className=" w-full md:w-3/4 mx-auto ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className=" grid grid-cols-1 sm:grid-cols-2 sm:gap-5 p-7">
            <div className="flex flex-col gap-4">
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
              <Card className=" w-full md:w-full p-4 ">
                <CardContent className="flex items-center justify-center">
                  <FormField
                    control={form.control}
                    name="categoryImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <CustomSingleImageIpload
                            name="upload category image"
                            value={field.value}
                            onChange={(url) => field.onChange(url)}
                            onRemove={() => field.onChange("")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div>Product Names</div>
                <Button
                  type="button"
                  onClick={() => {
                    addTextField();
                    addImageField();
                  }}
                >
                  Add Fields
                </Button>
              </div>
              {textFields.map((textField, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <FormField
                    control={form.control}
                    name={`variants[${index}].name`}
                    render={({ field }) => (
                      <FormItem>
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
                  <FormField
                    control={form.control}
                    name={`variants[${index}].image`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <CustomSingleImageIpload
                            className="size-20"
                            name="product image"
                            value={field.value}
                            onChange={(url) => field.onChange(url)}
                            onRemove={() => field.onChange("")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      removeTextFields(index);
                      removeImageField();
                    }}
                  >
                    -
                  </Button>
                </div>
              ))}
            </div>
          </div>

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
  );
};

export default CategoryUpdateForm;
