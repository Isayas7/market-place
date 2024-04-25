"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import {
  UseBankQuery,
  useDPRegisterQuery,
  useWithdrawalQuery,
} from "@/hooks/use-users-query";
import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { wathdrawalform } from "@/validationschema/user";

const Withrawal = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(wathdrawalform),
    defaultValues: {
      name: "",
      bankinfo: "",
      accountNumber: "",
      amount: "",
      remark: "",
    },
  });

  const { mutate: withdraw, isSuccess, isLoading } = useWithdrawalQuery();
  const { data: banks } = UseBankQuery();

  const onSubmit = async (formValues) => {
    withdraw(formValues);
  };
  if (isSuccess) {
    console.log(isSuccess);

    router.push("/seller/payment");
  }

  return (
    <div>
      <div className="text-3xl p-2 font-bold">Withdrawal Form</div>
      <div className="flex flex-col md:flex-row gap-3">
        <Card className="p-2 w-full">
          <CardTitle className="m-2 w-full flex flex-col justify-center items-center gap-2">
            <div>Balance</div>
            <div> 1500 ETB</div>
          </CardTitle>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <Card className=" grid grid-cols-1 sm:gap-5 p-7">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Holder Full Name</FormLabel>
                        <FormControl>
                          <Input
                            className="p-3"
                            placeholder="full name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bankinfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Choose Bank</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Bank" />
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
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount in ETB</FormLabel>
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
                  <FormField
                    control={form.control}
                    name="remark"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Remark </FormLabel>
                        <FormControl>
                          <Input
                            className="p-3"
                            placeholder="remark"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Card>

                <Button
                  disabled={isLoading}
                  className="w-full ml-auto text-xl"
                  type="submit"
                >
                  Withdraw
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card className="w-full flex flex-col items-center p-2">
          <div className="p-2 text-xl font-bold">Withdrawal History</div>
          <div className="w-full flex p-2 hover:bg-slate-200 hover:dark:bg-mirage-500 cursor-pointer">
            <div className="w-1/2">
              <div>Tran-1990</div>
              <div>April 1, 2014</div>
            </div>
            <div className="w-1/2 h-full flex items-center justify-between">
              <div>3000 ETB</div>
              <div className="underline">Receipt</div>
            </div>
          </div>
          <div className="w-full flex p-2 hover:bg-slate-200 hover:dark:bg-mirage-500 cursor-pointer">
            <div className="w-1/2">
              <div>Tran-1990</div>
              <div>April 1, 2014</div>
            </div>
            <div className="w-1/2 h-full flex items-center justify-between">
              <div>3000 ETB</div>
              <div className="underline">Receipt</div>
            </div>
          </div>
          <div className="w-full flex p-2 hover:bg-slate-200 hover:dark:bg-mirage-500 cursor-pointer">
            <div className="w-1/2">
              <div>Tran-1990</div>
              <div>April 1, 2014</div>
            </div>
            <div className="w-1/2 h-full flex items-center justify-between">
              <div>3000 ETB</div>
              <div className="underline">Receipt</div>
            </div>
          </div>
          <div className="w-full flex p-2 hover:bg-slate-200 hover:dark:bg-mirage-500 cursor-pointer">
            <div className="w-1/2">
              <div>Tran-1990</div>
              <div>April 1, 2014</div>
            </div>
            <div className="w-1/2 h-full flex items-center justify-between">
              <div>3000 ETB</div>
              <div className="underline">Receipt</div>
            </div>
          </div>
          <div className="w-full flex p-2 hover:bg-slate-200 hover:dark:bg-mirage-500 cursor-pointer">
            <div className="w-1/2">
              <div>Tran-1990</div>
              <div>April 1, 2014</div>
            </div>
            <div className="w-1/2 h-full flex items-center justify-between">
              <div>3000 ETB</div>
              <div className="underline">Receipt</div>
            </div>
          </div>
          <div className="w-full flex p-2 hover:bg-slate-200 hover:dark:bg-mirage-500 cursor-pointer">
            <div className="w-1/2">
              <div>Tran-1990</div>
              <div>April 1, 2014</div>
            </div>
            <div className="w-1/2 h-full flex items-center justify-between">
              <div>3000 ETB</div>
              <div className="underline">Receipt</div>
            </div>
          </div>
          <div className="w-full flex p-2 hover:bg-slate-200 hover:dark:bg-mirage-500 cursor-pointer">
            <div className="w-1/2">
              <div>Tran-1990</div>
              <div>April 1, 2014</div>
            </div>
            <div className="w-1/2 h-full flex items-center justify-between">
              <div>3000 ETB</div>
              <div className="underline">Receipt</div>
            </div>
          </div>
          <div className="w-full flex p-2 hover:bg-slate-200 hover:dark:bg-mirage-500 cursor-pointer">
            <div className="w-1/2">
              <div>Tran-1990</div>
              <div>April 1, 2014</div>
            </div>
            <div className="w-1/2 h-full flex items-center justify-between">
              <div>3000 ETB</div>
              <div className="underline">Receipt</div>
            </div>
          </div>
          <div className="w-full flex p-2 ">See more</div>
        </Card>
      </div>
    </div>
  );
};

export default Withrawal;
