"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import RegistrationForm from "@/components/register/registration-form";

export default function Register() {
  return (
    <div className="w-full  lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[600px]">
      <div className="hidden  lg:flex flex-col items-center">
        <h1 className="text-4xl">Welcome!</h1>

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
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">
              Get started absolutely free
            </CardTitle>
          </CardHeader>
          <RegistrationForm />
          <div className="w-full  flex  justify-center gap-1">
            Already have an account?
            <div className="text-jade hover:underline ">
              <Link href={"/login"}>Sign in</Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
