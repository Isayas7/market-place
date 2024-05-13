"use client";

import { Button } from "@/components/ui/button";
import LoginForm from "@/components/login/login-form";
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
    <div className="w-full  lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[600px]">
      <div className="hidden  lg:flex items-center  flex-col">
        <h1 className="text-4xl">Welcome Back!</h1>
        <Image
          src={"/illustration_dashboard.png"}
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-contain "
        />
      </div>
      <Card className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>

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
            <Button
              variant="outline"
              // onClick={() =>
              //   signIn("google", {
              //     callbackUrl: localStorage.getItem("prevpath"),
              //   })
              // }
            >
              <FcGoogle className="text-2xl" />
            </Button>
            <Button
              variant="outline"
              // onClick={() =>
              //   signIn("google", {
              //     callbackUrl: localStorage.getItem("prevpath"),
              //   })
              // }
            >
              <FaSquareFacebook className="text-blue-500 text-2xl" />
            </Button>
          </div>
          <div className="w-full  flex  justify-center gap-1">
            Dont have an account?
            <div className="text-jade hover:underline ">
              <Link href={"/register"}>Create an account</Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
