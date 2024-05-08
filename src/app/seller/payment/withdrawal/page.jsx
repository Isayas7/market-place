"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
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
import { UseBankQuery, useSingleUserQuery } from "@/hooks/use-users-query";
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
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import {
  useTransactionQuery,
  useWithdrawalQuery,
} from "@/hooks/use-order-query";
import formatDate from "@/utils/formatDate";

const Withrawal = () => {
  const router = useRouter();
  const session = useSession();
  const { toast } = useToast();

  const { data: seller } = useSingleUserQuery(session?.data?.user?.id);
  const { data: transaction } = useTransactionQuery(session?.data?.user?.id);
  const {
    mutate: withdraw,
    isSuccess,
    isLoading,
    data,
    error,
    isError,
  } = useWithdrawalQuery(session?.data?.user?.id);
  const { data: banks } = UseBankQuery();

  console.log(banks);

  const form = useForm({
    resolver: zodResolver(wathdrawalform),
    defaultValues: async () => {
      const user = await axios.get(
        `http://localhost:3000/api/user/${session?.data?.user?.id}`
      );
      return {
        name: `${user?.data?.firstName} ${user?.data?.middleName} ${user?.data?.lastName}`,
        address: user?.data?.address,
        bankInfo: user?.data?.bankInfo,
        accountNumber: user?.data?.accountNumber,
        amount: "",
        remark: "",
      };
    },
  });

  const onSubmit = async (formValues) => {
    formValues.user = session?.data?.user?.id;
    console.log(formValues);
    if (formValues.amount > seller?.data?.balance) {
      toast({
        variant: "destructive",
        title: "Insufficient Balance",
      });
    } else {
      seller?.data?.balance > 0 && withdraw(formValues);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        className: " border-2 text-black bg-[#D4F4E7]",
        description: data?.data?.message,
      });
    } else if (isError) {
      toast({
        variant: "destructive",
        title: error?.response?.data?.message || "An error occurred",
      });
    }
  }, [isSuccess, error, isError, data, toast]);

  return (
    <div>
      <div className="text-3xl p-2 font-bold">Withdrawal Form</div>
      <div className="flex flex-col md:flex-row gap-3">
        <Card className="p-2 w-full">
          <CardTitle className="m-2 w-full flex flex-col justify-center items-center gap-2">
            <div>Balance</div>
            <div>
              {seller?.data?.balance === 0 ? "0" : seller?.data?.balance} ETB
            </div>
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
                          defaultValue={seller?.data?.bankInfo} // Set the default selected value here
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  banks?.data?.data?.find(
                                    (b) => b.id === seller?.data?.bankInfo
                                  )?.name || "Select Bank" // Placeholder when no bank is selected
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
        <Card className="w-full h-[50%] flex flex-col items-center p-2 overflow-y-scroll">
          <div className="p-2 text-xl font-bold">Withdrawal History</div>
          {transaction?.data?.map((tran) => (
            <div className="w-full flex  justify-between items-center p-2 hover:bg-slate-200 hover:dark:bg-mirage-500 cursor-pointer">
              <div className=" ">
                <div>TRA-{tran?._id.slice(0, 4)}</div>
                <div>{formatDate(tran?.createdAt)}</div>
              </div>

              <div>{tran?.name}</div>
              <div className="">{tran?.amount} ETB</div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default Withrawal;
