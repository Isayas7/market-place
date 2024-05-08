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
import { useMailerQuery } from "@/hooks/use-users-query";

export default function ForgotPassword() {
  const session = useSession();
  const router = useRouter();

  const emailSchema = z.object({
    email: z.string().min(2, {
      message: "please enter email",
    }),
  });

  const { mutate: sendEmail, isSuccess, isLoading } = useMailerQuery();
  const form = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values) => {
    sendEmail(values);
  };
  if (isSuccess) {
    router.push("forgotpassword/otpconfirmation");
  }

  return (
    <div className="flex justify-center items-center">
      <Card className="flex h-full mt-20 items-center justify-center max-w-md   py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Forgot your password?
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Enter the email address associated with your account and we'll
              send you OTP to reset your password.
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className=" md:min-w-[350px]">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="py-4"
                          placeholder="Email Address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                disabled={isLoading === "loading"}
                className="w-full text-xl py-4 "
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
}
