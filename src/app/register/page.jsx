"use client";

import RegistrationForm from "@/components/register/registration-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <div className=" flex items-center justify-center w-[90%] xl:w-[70%] mx-auto h-screen  ">
      <div className="w-full h-[65%] hidden lg:block lg:w-3/5 xl:w-3/5 transition-all duration-300">
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="text-4xl">Welcome Back!</h1>
          <Image
            src={"/illustration_dashboard.png"}
            className="w-full"
            alt="my"
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className="w-[90%] h-fit sm:w-[70%] lg:w-3/4 xl:w-2/5 transition-all duration-300 ">
        <Card className="h-full flex flex-col justify-center">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">
              Get started absolutely free
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <RegistrationForm />
            <div className="w-full  flex  justify-center gap-1">
              Already have an account?
              <div className="text-jade hover:underline ">
                <Link href={"/login"}>Sign in</Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
