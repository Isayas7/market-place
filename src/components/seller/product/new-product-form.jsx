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
import { productSchema } from "@/schema/user";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ProductForm,
  SellectProductForm,
  multiValueProductForm,
} from "@/form/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProductCreateQuery } from "@/hooks/use-product-query";
import CustomImageIpload from "@/components/image-uploader";
import MultiText from "@/components/multi-text";
import { Textarea } from "@/components/ui/textarea";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";

const NewProductForm = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productImage: [],
      categoryId: "",
      productType: "",
      brand: "",
      productName: "",
      size: [],
      price: "",
      color: [],
      model: "",
      description: "",
    },
  });

  const {
    mutate: crateProduct,
    isSuccess,
    isLoading,
  } = useProductCreateQuery();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const onSubmit = (formvalues) => {
    crateProduct(formvalues);
    router.push("/seller/product");
  };

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
                    <CustomImageIpload
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
              {SellectProductForm.map((item) => (
                <FormField
                  control={form.control}
                  name={item.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{item.label}</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={item.placeholder} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              ))}
              {ProductForm.map((item) => (
                <FormField
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

export default NewProductForm;
