import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

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
import { passwordChange } from "@/schema/user";
import { UseChangePasswordQuery } from "@/hooks/use-users-query";
import { useSession } from "next-auth/react";

function Security() {
  const session = useSession();

  const form = useForm({
    resolver: zodResolver(passwordChange),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const { mutate: changePassword, isSuccess } = UseChangePasswordQuery();

  const onSubmit = async (passwordInformation) => {
    const id = session.data.user.id;
    console.log(passwordInformation, id);
    changePassword({ passwordInformation, id });
  };

  return (
    <div className="w-full flex justify-center items-center p-2">
      <Card className="w-full  pt-4 align-middle ">
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-2 "
            >
              <FormField
                control={form.control}
                name="current_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Current password"
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
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Security;
