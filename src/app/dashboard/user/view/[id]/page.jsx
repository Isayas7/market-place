"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RiEdit2Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  UseApproveQuery,
  useSingleUserQuery,
  useUserUpdateQuery,
} from "@/hooks/use-users-query";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const ViewUser = ({ params }) => {
  const { data: user, isFetching } = useSingleUserQuery(params.id);

  const { mutate: approve, isSuccess, isLoading } = useUserUpdateQuery();

  const handleUpdateUser = () => {
    const { isActive, ...other } = user?.data;

    const updateUser = { isActive: !isActive, ...other };

    approve({ userInfo: updateUser, id: user?.data?._id });
  };

  return (
    <div>
      <div>
        <div className="text-xl my-2 font-bold "> User information</div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link href="/dashboard/user">User</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>User Detail</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col w-full md:flex-row gap-5 mt-2">
        <Card className=" w-full p-7  items-center ">
          <div className="relative flex flex-col justify-center items-center">
            <Avatar className="h-24 w-24  ">
              <AvatarImage src="https://github.com/shadcn.png" alt="man" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <Link
              href={`/dashboard/user/update/${params.id}`}
              className="bg-primary"
            >
              <RiEdit2Line className="absolute top-2 right-3  text-3xl bg-primary text-white rounded-full p-1 hover:bg-swansdown hover:text-jade" />
            </Link>
            <div className="text-xl font-bold">
              {user?.data.firstName && user.data.firstName + " "}
              {user?.data.middleName && user.data.middleName + " "}
              {user?.data.lastName && user.data.lastName}
            </div>
            <div className="bg-primary px-2 text-white rounded-sm">Seller</div>
          </div>
          <CardContent className=" w-full mt-8 ">
            <div className="mt-4">
              <div>User attribute</div>
              <div className="text-md my-4 flex">
                <div className="w-1/2">Email</div>
                <div>{user?.data.email} </div>
              </div>
              <hr />

              <hr />
              <div className="text-md my-4 flex">
                <div className="w-1/2">Address</div>
                {user?.data.address ? (
                  <div>{user.data.address}</div>
                ) : (
                  <div>
                    <span>&mdash;</span>
                  </div>
                )}
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
                className="w-full rounded-sm "
                width={400}
                height={200}
                alt="id"
              />
            </div>
            <div className="">
              <div>National Id</div>
              <Image
                src={user?.data?.nationalId?.url || "/nullid.jpg"}
                className="w-full rounded-sm "
                width={500}
                height={500}
                alt="id"
              />
            </div>
          </CardContent>
          <CardContent>
            {user?.data?.isActive ? (
              <Button onClick={handleUpdateUser}>Approved</Button>
            ) : (
              <Button className="bg-destructive" onClick={handleUpdateUser}>
                Approve
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ViewUser;
