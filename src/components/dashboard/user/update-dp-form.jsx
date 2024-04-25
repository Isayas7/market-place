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
import { deliveryPersonnelSchema } from "@/validationschema/user";
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
import { deliveryPersonnelsForm } from "@/form/form-data";
import { UseBankQuery, useUserUpdateQuery } from "@/hooks/use-users-query";
import CustomSingleImageIpload from "@/components/single-image-uploader";

import axios from "axios";
import { useState } from "react";

const UpdateDeliveryPersonnelForm = ({ userId }) => {
  const router = useRouter();
  const [selectedBank, setSelectedBank] = useState("");

  const { mutate: updateDP, isSuccess, isLoading } = useUserUpdateQuery();
  const { data: banks } = UseBankQuery();

  const form = useForm({
    // resolver: zodResolver(deliveryPersonnelSchema),
    defaultValues: async () => {
      const user = await axios.get(`http://localhost:3000/api/user/${userId}`);
      setSelectedBank(user?.data?.bankInfo);
      return {
        _id: user?.data._id,
        profileImage: user?.data?.profileImage,
        firstName: user?.data?.firstName,
        middleName: user?.data?.middleName,
        lastName: user?.data?.lastName,
        email: user?.data?.email,
        address: user?.data?.address,
        identificationCard: user?.data?.identificationCard,
        nationalId: user?.data?.nationalId,
        phoneNumber: user?.data?.phoneNumber,
        bankInfo: user?.data?.bankInfo,
        accountNumber: user?.data?.accountNumber,
      };
    },
  });

  const onSubmit = (formValues) => {
    console.log("formValues", formValues);
    updateDP({ userInfo: formValues, id: formValues._id });
  };

  let tab;
  if (typeof localStorage !== "undefined") {
    tab = localStorage.getItem("tab");
  }

  if (isSuccess) {
    router.replace(`/dashboard/user?role=${tab}`);
  }

  const selectedBankName = banks?.data?.data?.find(
    (b) => b.name === selectedBank
  )?.name;

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
              {deliveryPersonnelsForm.map((item, index) => (
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
                    <FormLabel>Choose Bank</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={selectedBankName}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              banks?.data?.data?.find(
                                (b) => b.name === selectedBank
                              )?.name
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {banks?.data?.data?.map((bank) => (
                          <SelectItem key={bank.id} value={bank.id}>
                            {bank.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
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

export default UpdateDeliveryPersonnelForm;
