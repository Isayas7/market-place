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
import { passwordChange } from "@/validationschema/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { EyeIcon, EyeOffIcon, Variable } from "lucide-react";
import { useChangePasswordQuery } from "@/hooks/use-users-query";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Security() {
  const [showPassword, setShowPassword] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [newPassword, setNewPassword] = useState(false);

  const session = useSession();
  const { toast } = useToast();

  const {
    mutate: changePassword,
    isSuccess,
    data,
    isError,
    isLoading,
  } = useChangePasswordQuery();

  const form = useForm({
    resolver: zodResolver(passwordChange),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (passwordInformation) => {
    const id = session.data.user.id;
    changePassword({ passwordInfo: passwordInformation, id: id });
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        className: " border-2 text-black bg-[#D4F4E7]",
        description: data?.data,
      });
      form.reset({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
    } else if (isError) {
      toast({
        variant: "destructive",
        title: "Currect password is incorrect",
      });
    }
  }, [isSuccess, isError, toast, data.data, form]);

  return (
    <div className="w-full flex  p-2">
      <Card className="w-full md:max-w-[750px]  pt-4 align-middle ">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className=" w-full  flex flex-col space-y-2">
                <FormField
                  control={form.control}
                  name="current_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Current password"
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
                  name="new_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={newPassword ? "text" : "password"}
                            placeholder="New password"
                            {...field}
                          />
                          <span
                            className="absolute  right-0 bottom-2 flex items-center pr-3 cursor-pointer"
                            onClick={() => setNewPassword(!newPassword)}
                          >
                            {newPassword ? <EyeOffIcon /> : <EyeIcon />}
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
                            type={confirm ? "text" : "password"}
                            placeholder="Confirm password"
                            {...field}
                          />
                          <span
                            className="absolute  right-0 inset-y-0 flex items-center pr-3 cursor-pointer"
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

                <Button type="submit">
                  {isLoading ? (
                    <AiOutlineLoading3Quarters className=" text-white  animate-spin" />
                  ) : (
                    "Save"
                  )}
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
