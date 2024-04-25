"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { loginSchema } from "@/validationschema/user";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { z } from "zod";

export default function ForgotPassword() {
  const session = useSession();
  const router = useRouter();

  const emailSchema = z.object({
    email: z.string().min(2, {
      message: "please enter email",
    }),
  });

  const form = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values) => {
    router.push("forgotpassword/otpconfirmation");
  };

  return (
    <div className="flex flex-col   mt-[15%] items-center justify-center">
      <div className="text-2xl p-4 justify-center">
        {" "}
        Enter your email to receive OTP
      </div>
      <Card className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className=" md:min-w-[350px]">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="py-4"
                        placeholder="ebo@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              disabled={session.status === "loading"}
              className="w-full text-xl py-4 "
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
