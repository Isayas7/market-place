"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseBankQuery, useSingleUserQuery } from "@/hooks/use-users-query";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const DeliveryPersonnelBalance = () => {
  const session = useSession();
  const { data: deliveryPersonnel, isLoading } = useSingleUserQuery(
    session?.data?.user?.id
  );

  const { data: banks, isLoading: loading } = UseBankQuery();
  if (isLoading || loading) {
    return (
      <div className="flex items-center justify-center h-1/2">
        <AiOutlineLoading3Quarters className="text-5xl text-jade animate-spin" />
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3  gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className="text-4xl font-bold">25,000 ETB</span>
            <ArrowUpIcon className="h-6 w-6 text-green-500" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Spent</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className="text-4xl font-bold">12,500 ETB</span>
            <ArrowDownIcon className="h-6 w-6 text-red-500" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Balance</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className="text-4xl font-bold">
              {deliveryPersonnel?.data?.balance} ETB
            </span>
            <Link
              disabled={deliveryPersonnel?.data?.balance <= 0}
              href="withdrawal"
            >
              <Button size="sm">Withdraw</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      <Card className="p-2">
        <div className="text-2xl font-bold p-2">Account Information</div>

        <div className="p-4 flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <Label>Account Holder Name</Label>
            <Input
              defaultValue={`${deliveryPersonnel?.data?.firstName || ""} ${
                deliveryPersonnel?.data?.middleName || ""
              } ${deliveryPersonnel?.data?.lastName || ""}`}
              disabled
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Label>Phone Number</Label>
            <Input
              defaultValue={deliveryPersonnel?.data?.phoneNumber}
              disabled
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Label>Selected Bank</Label>
            <Input
              defaultValue={
                banks?.data?.data?.find(
                  (b) => b.id === deliveryPersonnel?.data?.bankInfo
                )?.name
              }
              disabled
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Label>Account Number</Label>
            <Input
              defaultValue={deliveryPersonnel?.data?.accountNumber}
              disabled
            />
          </div>
        </div>
      </Card>

      <div className="mt-4 gap-2 flex flex-col md:flex-row">
        <Card className="w-full">
          <CardHeader className="text-2xl font-bold">
            Withdrawal method
          </CardHeader>
          <CardContent className="text-xl font-bold text-jade">
            <Link href="https://chapa.co">
              <Image src={"/chapa.png"} width={200} height={200} />
            </Link>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="text-2xl font-bold">Cashout method</CardHeader>
          <CardContent className="text-xl font-bold text-jade">
            {
              banks?.data?.data?.find(
                (b) => b.id === deliveryPersonnel?.data?.bankInfo
              )?.name
            }
          </CardContent>
          <CardFooter>
            {deliveryPersonnel?.data?.accountNumber &&
            deliveryPersonnel.data.accountNumber.length > 6 ? (
              <>
                {deliveryPersonnel.data.accountNumber.slice(0, 3)}
                ***
                {deliveryPersonnel.data.accountNumber.slice(-3)}
              </>
            ) : (
              "***"
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DeliveryPersonnelBalance;
