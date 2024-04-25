import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { DividerHorizontalIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

const SellerPayment = () => {
  return (
    <div className="w-full">
      <Card className="p-2">
        <div className="text-2xl font-bold p-2">Payment</div>
        <div className="flex flex-col md:flex-row w-full gap-3 ">
          <Card className="w-full">
            <CardHeader className="text-2xl font-bold text-jade">
              Cash in Flow
            </CardHeader>
            <CardContent className="text-2xl font-bold text-jade">
              +30000 ETB
            </CardContent>
            <CardFooter className="text-xl">
              For withrawals or payouts
            </CardFooter>
          </Card>
          <Card className="w-full">
            <CardHeader className="text-2xl font-bold text-jade">
              Cash out Flow
            </CardHeader>
            <CardContent className="text-2xl font-bold text-red-500">
              -1000 ETB
            </CardContent>
            <CardFooter>Cash in Flow</CardFooter>
          </Card>
          <Card className="w-full">
            <CardHeader className="text-2xl font-bold text-jade">
              Withdrawal Amount
            </CardHeader>
            <CardContent className="text-2xl font-bold text-jade">
              10000 ETB
            </CardContent>
            <CardFooter>
              <Link href="payment/withdrawal">
                <Button>Withdraw</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <div>Default account setted</div>
          <div className="flex gap-4">
            <div className="w-1/2">Account Holder Name</div>
            <div>Ebisa Girma Garedo</div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">Phone Number</div>
            <div>0987654321</div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">Cashout Method</div>
            <div>Commercial Bank of Ethiopia</div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">Account Number</div>
            <div>1**************117</div>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <Button>Edit</Button>
        </div>
      </Card>

      <div className="mt-4 gap-2 flex flex-col md:flex-row">
        <Card className="w-full">
          <CardHeader className="text-2xl font-bold text-jade">
            Default Setted cashout method
          </CardHeader>
          <CardContent className="text-xl font-bold text-jade">
            Chapa payment
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="text-2xl font-bold text-jade">
            Cashout method
          </CardHeader>
          <CardContent className="text-xl font-bold text-jade">
            Commercial Bank of Ethiopia
          </CardContent>
          <CardFooter>1000*********117</CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SellerPayment;
