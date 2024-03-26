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
      categoryImage: undefined,
    },
  });

  const {
    mutate: registerCategory,
    isSuccess,
    isLoading,
  } = useCategoryRegisterQuery();

  const onSubmit = async (formValues) => {
    const formData = new FormData();

    textFields.forEach((textField, index) => {
      const productNameKey = `productNames_${textField.id}`;
      const imageNameKey = `image_${textField.id}`;

      const productName = formValues[productNameKey];
      const imageFile = formValues[imageNameKey][0]; // Assuming there's only one image selected

      // Append the image file with a unique key (e.g., using index)
      formData.append(`image_${index}`, imageFile);

      // Append the product name separately
      formData.append(`productName_${index}`, productName);
    });

    // Append other form data
    for (const key in formValues) {
      if (!key.startsWith("productNames_") && !key.startsWith("image_")) {
        formData.append(key, formValues[key]);
      }
    }
    // Append additional data
    formData.append("selectedImage", selectedImage);
    formData.append("email", session.data.user.email);

    // Submit the form data
    registerCategory(formData);
  };

  if (isSuccess) {
    router.push("/dashboard/category");
  }

  const addTextField = () => {
    setTextFields((prevTextFields) => [
      ...prevTextFields,
      { id: prevTextFields.length, isDefault: false },
    ]);
  };

  // Function to remove a set of text fields
  const removeTextFields = (index) => {
    const updatedFields = [...textFields];
    updatedFields.splice(-1, 1);
    setTextFields(updatedFields);
  };

  const handleImageChange = (index, imageFile) => {
    const updatedImages = [...selectedImages];
    updatedImages[index] = imageFile;
    setSelectedImages(updatedImages);
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
                <div className="flex gap-2 items-center">
                  <FormField
                    key={textField.id}
                    control={form.control}
                    name={`productNames_${textField.id}`}
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
                    key={`${textField.id}image`}
                    control={form.control}
                    name={`image_${textField.id}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="file"
                            className="p-3"
                            id="fileInput"
                            onBlur={field.onBlur}
                            name={field.name}
                            onChange={(e) => {
                              field.onChange(e.target.files);
                              handleImageChange(e.target.files?.[0] || null); // Change here
                            }}
                            ref={field.ref}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      removeTextFields();
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
