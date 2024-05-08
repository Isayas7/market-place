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
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function SetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const session = useSession();
  const router = useRouter();

  const newPassword = z
    .object({
      new_password: z.string().min(2, {
        message: "new password required",
      }),
      confirm_password: z.string().min(2, {
        message: "password required",
      }),
    })
    .refine((data) => data.new_password === data.confirm_password, {
      message: "Password don't match",
      path: ["confirm_password"],
    });

  const form = useForm({
    resolver: zodResolver(newPassword),
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
  });

  const onSubmit = (values) => {
    router.push("login");
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <Card className=" p-8 w-full max-w-md ">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Set New password
            </h2>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className=" md:min-w-[350px] flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="new_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="New password"
                            {...field}
                          />
                          <span
                            className="absolute inset-y-0 right-0 bottom-1 flex items-center pr-3 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                          </span>
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={confirm ? "text" : "password"}
                            placeholder="Confirm password"
                            {...field}
                          />
                          <span
                            className="absolute inset-y-0 right-0 bottom-1 flex items-center pr-3 cursor-pointer"
                            onClick={() => setConfirm(!confirm)}
                          >
                            {confirm ? <EyeOffIcon /> : <EyeIcon />}
                          </span>
                        </div>
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
        </div>
      </Card>
    </div>
  );
}
