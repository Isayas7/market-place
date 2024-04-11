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
import { useSession } from "next-auth/react";
import CustomSingleImageIpload from "@/components/single-image-uploader";

const CategoryForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [textFields, setTextFields] = useState([{ id: 0, isDefault: true }]);

  const router = useRouter();
  const session = useSession();

  const form = useForm({
    // resolver: zodResolver(categorySchema),
    defaultValues: {
      categoryName: "",
      categoryImage: "",
      productNames: [
        {
          name: "",
          image: "",
        },
      ],
    },
  });

  const {
    mutate: registerCategory,
    isSuccess,
    isLoading,
  } = useCategoryRegisterQuery();

  const onSubmit = async (formValues) => {
    console.log("formValues", formValues);
    registerCategory(formValues);
  };

  if (isSuccess) {
    router.push("/dashboard/category");
  }

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
    updatedDefaultValues.productNames.splice(index, 1);
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
                    name={`productNames[${index}].name`}
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
                    name={`productNames[${index}].image`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <CustomSingleImageIpload
                            className="size-20"
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

export default CategoryForm;
