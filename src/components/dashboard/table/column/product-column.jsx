"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal } from "lucide-react";
import { DataTableColumnHeader } from "../data-table-column-header";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useBrandRegisterQuery } from "@/hooks/use-product-category-query";

export const product_columns = (category) => {
  return [
    {
      accessorKey: "image",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Image" />
      ),
      cell: ({ row }) => {
        const image = row.original.image.url;

        return (
          <Image
            src={image || "/nullid.jpg"}
            width={500}
            height={500}
            className="rounded-full object-cover size-8"
            alt="image"
          />
        );
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Product Name" />
      ),
    },
    {
      accessorKey: "brands.name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Brands" />
      ),
      cell: ({ row }) => (
        <span>{row.original.brands.map((brand) => brand.name).join(", ")}</span>
      ),
    },
    {
      accessorKey: "numberOfAdds",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Number of Adds" />
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
    },

    {
      id: "branding",
      cell: ({ row }) => {
        const [selectedImages, setSelectedImages] = useState([]);
        const [textFields, setTextFields] = useState([
          { id: 0, isDefault: true },
        ]);

        const form = useForm({
          defaultValues: {},
        });

        const {
          mutate: registerBrand,
          isSuccess,
          isLoading,
        } = useBrandRegisterQuery();

        const onSubmit = async (formValues) => {
          const formData = new FormData();

          textFields.forEach((textField, index) => {
            const brandNameKey = `brandNames_${textField.id}`;
            const imageNameKey = `image_${textField.id}`;

            const brandName = formValues[brandNameKey];
            const imageFile = formValues[imageNameKey][0];

            formData.append(`image_${index}`, imageFile);

            formData.append(`brandName_${index}`, brandName);
          });

          for (const key in formValues) {
            if (!key.startsWith("brandNames_") && !key.startsWith("image_")) {
              formData.append(key, formValues[key]);
            }
          }
          formData.append("productId", row.original._id);
          formData.append("categoryId", category);

          registerBrand(formData, category);
        };

        const addTextField = () => {
          setTextFields((prevTextFields) => [
            ...prevTextFields,
            { id: prevTextFields.length, isDefault: false },
          ]);
        };

        // Function to remove a set of text fields
        const removeTextFields = (index) => {
          const updatedFields = [...textFields];
          updatedFields.splice(index, 1);
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

        const removeImageField = (index) => {
          const updatedImages = [...selectedImages];
          updatedImages.splice(index, 1);
          setSelectedImages(updatedImages);
        };

        return (
          <Popover>
            <PopoverTrigger>
              <Button>Add Brand</Button>
            </PopoverTrigger>
            <PopoverContent className="w-96">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 p-4"
                >
                  <div className="flex justify-between items-center ">
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
                        name={`brandNames_${textField.id}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="p-3"
                                placeholder="brand names"
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
                                name={field.name}
                                onChange={(e) => {
                                  field.onChange(e.target.files);
                                  handleImageChange(
                                    e.target.files?.[0] || null
                                  );
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

                  <Button
                    disabled={isLoading}
                    className="w-full ml-auto text-xl"
                    type="submit"
                  >
                    Submit
                  </Button>
                </form>
              </Form>
            </PopoverContent>
          </Popover>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;
        const router = useRouter();

        const handleUpdateClick = () => {};
        const handleViewClick = () => {};

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuItem onClick={handleViewClick}>
                View{" "}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleUpdateClick}>
                Update
              </DropdownMenuItem>
              {/* <DropdownMenuSeparator /> */}
              <DropdownMenuItem>Deactivate</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
