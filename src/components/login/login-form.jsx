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

export default function LoginForm() {
  const session = useSession();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  if (session.status === "authenticated") {
    router.push("/");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => signIn("credentials", values))}
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
                  <Input
                    className="py-4"
                    type="password"
                    placeholder="enter password"
                    {...field}
                  />
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
          disabled={session.status === "loading"}
          className="w-full text-xl py-4 "
          type="submit"
        >
          {session.status === "loading" ? "Loading" : "Login"}
        </Button>
      </form>
    </Form>
  );
}
