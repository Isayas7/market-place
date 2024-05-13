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
import { signIn, useSession } from "next-auth/react";
import { loginSchema } from "@/validationschema/user";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const session = useSession();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  console.log(session.status);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          (values) => {
            const { email, password } = values;
            signIn("credentials", {
              email,
              password,
              callbackUrl: localStorage.getItem("prevpath"),
            });
          }
          // signIn("credentials", values, { callbackUrl: "/cart" })
        )}
        className="space-y-8"
      >
        <div>
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
                      placeholder="enter password"
                      {...field}
                    />
                    <span
                      className="absolute right-0 bottom-2 flex items-center pr-3 cursor-pointer"
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
          <Link
            href="login/forgotpassword"
            className="text-jade underline text-sm"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          className="w-full text-xl py-4 "
          type="submit"
          onClick={() => setLoading(!loading)}
          disabled={loading}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className=" text-white  animate-spin" />
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Form>
  );
}
