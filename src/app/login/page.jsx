"use client";

import LoginForm from "@/components/login/login-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaSquareFacebook } from "react-icons/fa6";

export default function Login() {
  return (
    <div className=" flex items-center justify-center w-[90%] xl:w-[70%] mx-auto h-screen space-x-8 ">
      <div className="w-full h-[65%] hidden lg:flex lg:w-3/5 xl:w-3/5 transition-all duration-300  lg:flex-col justify-center items-center">
        <h1 className="text-4xl">Welcome Back!</h1>
        <Image
          src={"/illustration_dashboard.png"}
          className="w-full"
          alt="my"
          width={500}
          height={500}
        />
      </div>
      <div className=" h-[65%] w-[90%] sm:w-[70%] lg:w-3/4 xl:w-2/5 transition-all duration-300 ">
        <Card className="h-full flex flex-col justify-center">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Login to your account</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <LoginForm />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <CardDescription className="w-full text-center">
              Login with below provider account
            </CardDescription>
            <div className="grid grid-cols-2 gap-6">
              <Button variant="outline" onClick={() => signIn("google")}>
                <FcGoogle className="text-2xl" />
              </Button>
              <Button variant="outline" onClick={() => signIn("facebook")}>
                <FaSquareFacebook className="text-blue-500 text-2xl" />
              </Button>
            </div>
            <div className="w-full  flex  justify-center gap-1">
              Dont have an account?
              <div className="text-jade hover:underline ">
                <Link href={"/register"}>Create an account</Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
