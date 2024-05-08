"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/validationschema/user";
import { useRouter } from "next/navigation";
import { useUserRegisterQuery } from "@/hooks/use-users-query";
import { roleData } from "@/utils/permission";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const router = useRouter();

  const { mutate: register, isSuccess } = useUserRegisterQuery();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = (formValues) => {
    formValues.role = roleData.Buyer;
    register(formValues);
  };

  if (isSuccess) {
    router.push("/login");
  } else {
    console.log("Error");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      className="py-4"
                      placeholder="First Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      className="py-4"
                      placeholder="Last Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="py-4"
                    placeholder="examle@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="py-4"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      {...field}
                    />
                    <span
                      className="absolute  right-0 bottom-2 flex items-center pr-3 cursor-pointer"
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
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="py-4"
                      type={confirm ? "text" : "password"}
                      placeholder="Confirm password"
                      {...field}
                    />
                    <span
                      className="absolute  right-0 bottom-2 flex items-center pr-3 cursor-pointer"
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

        <Button className="w-full text-xl px-6" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
