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
import { deliveryPersonnelSchema } from "@/schema/user";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaCloudUploadAlt } from "react-icons/fa";

const DeliveryPersonnelForm = () => {
  const [selectedIdCard, setSelectedIdCardImage] = useState(null);
  const [selectedId, setSelectedIdImage] = useState(null);

  const form = useForm({
    resolver: zodResolver(deliveryPersonnelSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      address: "",
      identificationCard: undefined,
      nationalId: undefined,
      phoneNumber: "",
      bankInfo: "",
      accountNumber: "",
    },
  });

  function onSubmit(values) {}

  return (
    <div className="flex flex-col md:flex-row gap-5">
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
              <div>
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          className="p-3"
                          placeholder="fist name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="middleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Middle Name</FormLabel>
                      <FormControl>
                        <Input
                          className="p-3"
                          placeholder="middle name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          className="p-3"
                          placeholder="lastName"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          className="p-3"
                          placeholder="examle@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          className="p-3"
                          placeholder="address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="identificationCard"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Identification Card</FormLabel>
                      <FormControl>
                        <Input
                          className="p-3"
                          type="file"
                          placeholder="Id card"
                          {...field}
                          id="fileInput"
                          onBlur={field.onBlur}
                          onChange={(e) => {
                            field.onChange(e.target.files);
                            setSelectedIdCardImage(e.target.files?.[0] || null);
                          }}
                          ref={field.ref}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nationalId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>National ID</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          className="p-3"
                          placeholder="natioal Id"
                          {...field}
                          id="fileInput"
                          onBlur={field.onBlur}
                          onChange={(e) => {
                            field.onChange(e.target.files);
                            setSelectedIdImage(e.target.files?.[0] || null);
                          }}
                          ref={field.ref}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          className="p-3"
                          placeholder="phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bankInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank</FormLabel>
                      <FormControl>
                        <Input
                          className="p-3"
                          placeholder="bank information"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Number</FormLabel>
                      <FormControl>
                        <Input
                          className="p-3"
                          placeholder="account number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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

export default DeliveryPersonnelForm;
