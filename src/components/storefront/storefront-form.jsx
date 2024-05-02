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
import { storefrontSchema } from "@/validationschema/user";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { StoreFrontCrationForm } from "@/form/form-data";
import { useUserUpdateQuery } from "@/hooks/use-users-query";
import CustomSingleImageIpload from "@/components/single-image-uploader";
import { useSession } from "next-auth/react";
import { UseRoleQuery } from "@/hooks/use-role-query";
import { roleData } from "@/utils/permission";

const StorefrontForm = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const {
    mutate: updateUserToSeller,
    isSuccess,
    isLoading,
  } = useUserUpdateQuery();

  const { data: rolesData, isFetching } = UseRoleQuery();

  const sellerRole = rolesData?.data?.find(
    (role) => (role.role = roleData.Seller)
  );

  const form = useForm({
    resolver: zodResolver(storefrontSchema),
    defaultValues: {
      profileImage: "",
      identificationCard: "",
      nationalId: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      bankInfo: "",
      accountNumber: "",
    },
  });

  const onSubmit = (formValues) => {
    formValues.role = [...new Set([...session.user.role, sellerRole._id])];
    updateUserToSeller({ userInfo: formValues, id: session.user.id });
  };

  if (isSuccess) {
    router.push(`/seller`);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row gap-5">
          <div className=" w-full  md:w-2/5 flex flex-col  gap-5">
            <Card className=" py-4 w-full   h-fit flex  flex-col items-center ">
              <FormField
                control={form.control}
                name="profileImage"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomSingleImageIpload
                        name="Uplaod profile Image"
                        value={field.value}
                        onChange={(url) => field.onChange(url)}
                        onRemove={() => field.onChange("")}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </Card>
            <Card className=" py-4 w-full  h-fit flex  flex-col items-center ">
              <FormField
                control={form.control}
                name="identificationCard"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomSingleImageIpload
                        name="Upload Identification Card"
                        value={field.value}
                        onChange={(url) => field.onChange(url)}
                        onRemove={() => field.onChange("")}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </Card>
            <Card className="py-4 w-full   h-fit flex  flex-col items-center ">
              <FormField
                control={form.control}
                name="nationalId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomSingleImageIpload
                        name="Upload National Id"
                        value={field.value}
                        onChange={(url) => field.onChange(url)}
                        onRemove={() => field.onChange("")}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </Card>
          </div>

          <div className=" w-full md:w-3/5 space-y-8 ">
            <Card className=" grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-7    ">
              {StoreFrontCrationForm.map((item, index) => (
                <FormField
                  key={index}
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
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              ))}
              <FormField
                control={form.control}
                name="bankInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Info</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sellect Bank" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="CBE">CBE</SelectItem>
                        <SelectItem value="Awash">Awash</SelectItem>
                      </SelectContent>
                    </Select>

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

export default StorefrontForm;
