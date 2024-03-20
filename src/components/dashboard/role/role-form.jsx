import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { roleSchema } from "@/schema/user";
import { useSession } from "next-auth/react";
import { useRoleRegisterQuery } from "@/hooks/use-role-query";

const RoleForm = () => {
  const router = useRouter();
  const session = useSession();

  const form = useForm({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate: registerRole, isSuccess, isLoading } = useRoleRegisterQuery();

  const onSubmit = async (values) => {
    registerRole(values);
  };

    return (
      <div className="flex flex-col md:flex-row gap-5">
        <div className=" w-full md:w-3/5 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card className=" grid grid-cols-1 sm:grid-cols-2 sm:gap-5 p-7">
                <div>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role Name</FormLabel>
                        <FormControl>
                          <Input
                            className="p-3"
                            placeholder="role name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Card>
              <Button
                disabled={isLoading}
                className="w-full ml-auto text-xl"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    );
};

export default RoleForm;
