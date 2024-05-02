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

export default function SetPassword() {
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
    <div className="flex flex-col   mt-[20%] items-center justify-center">
      <Card className="w-full max-w-[400px] pt-4 align-middle ">
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-2 "
            >
              <FormField
                control={form.control}
                name="new_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="New password"
                        {...field}
                        className="w-full px-3 py-2 rounded-md border border-green-300 focus:ring-opacity-50"
                        style={{ minWidth: "300px" }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm password"
                        {...field}
                        className="w-full px-3 py-2 rounded-md border border-green-300 focus:ring-opacity-50"
                        style={{ minWidth: "300px" }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex items-end justify-end">
                <Button type="submit" className="max-w-fit">
                  Set
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
