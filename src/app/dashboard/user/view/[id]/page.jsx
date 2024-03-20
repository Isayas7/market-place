"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RiEdit2Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UseDPQuery } from "@/hooks/use-users-query";

const ViewUser = ({ params }) => {
  const router = useRouter();

  const { data: user } = UseDPQuery(params.id);
  console.log(user);
  const handleUpdateClick = () => {
    router.push(`/dashboard/user/update/${params.id}`);
  };

  return (
    <div>
      <h1 className="text-xl">User Information</h1>
      <div className="flex flex-col w-full md:flex-row gap-5 mt-10">
        <Card className=" w-full p-7  items-center ">
          <div className="relative flex flex-col justify-center items-center">
            <Avatar className="h-24 w-24  ">
              <AvatarImage src="https://github.com/shadcn.png" alt="man" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <button>
              <RiEdit2Line
                onClick={handleUpdateClick}
                className="absolute top-2 right-3  text-2xl"
              />
            </button>
            <div className="text-xl font-bold">
              {user?.data.firstName + " " + user?.data.middleName}
            </div>
            <div>Seller</div>
          </div>
          <CardContent className=" w-full mt-8 ">
            <div className="mt-4">
              <div>User attribute</div>
              <div className="text-md my-4 flex">
                <div className="w-1/2">Email</div>
                <div>{user?.data.email}</div>
              </div>
              <hr />
              <div className="text-md my-4 flex">
                <div className="w-1/2">Email</div>
                <div>
                  {user?.data.firstName +
                    " " +
                    user?.data.middleName +
                    " " +
                    user?.data.lastName}
                </div>
              </div>
              <hr />
              <div className="text-md my-4 flex">
                <div className="w-1/2">Address</div>
                <div>{user?.data.address}</div>
              </div>
              <hr />
              <div className="text-md my-4 flex">
                <div className="w-1/2">Phone Number</div>
                <div>{user?.data.phoneNumber}</div>
              </div>
              <hr />
              <div className="text-md my-4 flex">
                <div className="w-1/2">Bank Info</div>
                <div>{user?.data.bankInfo}</div>
              </div>
              <hr />
              <div className="text-md my-4 flex">
                <div className="w-1/2">Account Number</div>
                <div>{user?.data.accountNumber}</div>
              </div>
              <hr />
              <div className="text-md my-4 flex">
                <div className="w-1/2">Store Front</div>
                <div>1 store</div>
              </div>
              <hr />
              <div className="text-md my-4 flex">
                <div className="w-1/2">Product</div>
                <div>123 ads</div>
              </div>
              <hr />
              <div className="text-md my-4 flex">
                <div className="w-1/2">Product Category</div>
                <div>2 category</div>
              </div>
              <hr />
            </div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardContent className=" flex flex-col w-full p-10">
            <div className="">
              <div>Kebele Id</div>
              <Image
                src={user?.data?.identificationCard?.url || "/nullid.jpg"}
                className="w-full "
                width={400}
                height={200}
                alt="id"
              />
            </div>
            <div className="">
              <div>National Id</div>
              <Image
                src={user?.data?.nationalId?.url || "/nullid.jpg"}
                className="w-full bg-swansdown "
                width={400}
                height={200}
                alt="id"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ViewUser;
