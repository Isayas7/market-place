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
import { storefrontSchema } from "@/validationschema/user";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useStorefrontCreationQuery } from "@/hooks/use-users-query";
import { useState } from "react";
import { StoreFrontCrationForm } from "@/form/form";

const StorefrontForm = () => {
  const [selectedIdCard, setSelectedIdCardImage] = useState(null);
  const [selectedId, setSelectedIdImage] = useState(null);

  const router = useRouter();
  const session = useSession();

  const form = useForm({
    resolver: zodResolver(storefrontSchema),
    defaultValues: {
      lastName: "",
      address: "",
      location: "",
      identificationCard: null,
      nationalId: null,
      phoneNumber: "",
      bankInfo: "",
      accountNumber: "",
    },
  });

  const {
    mutate: createStorefront,
    isSuccess,
    isLoading,
  } = useStorefrontCreationQuery();

  const onSubmit = (values) => {
    values.email = session.data.user.email;
    createStorefront(values);
  };

  return (
    <div className="flex flex-col md:flex-row gap-5 ">
      <Card className=" w-full md:w-2/5 ">
        <CardContent className="flex justify-center items-center mt-24  ">
          <div className=" size-36 flex justify-center items-center p-3 rounded-full   border  dark:border-gray-600 border-dashed">
            <Button className="size-28 rounded-full  flex-col justify-center items-center ">
              <div>
                <FaCloudUploadAlt className="size-8" />
              </div>
              <p className="text-xs">upload photo</p>
            </Button>
          </div>
        </CardContent>
        <CardContent className="flex justify-center items-center">
          <p className="text-xs">upload photo</p>
        </CardContent>
      </Card>
      <div className=" w-full md:w-3/5 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card className=" grid grid-cols-1 sm:grid-cols-2 sm:gap-5 p-7">
              {StoreFrontCrationForm.map((item) => (
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </Card>

            <Button className="w-full ml-auto text-xl" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default StorefrontForm;
