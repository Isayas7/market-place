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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

function Security() {
  const form = useForm();

  const onSubmit = () => {};

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-md">
        <CardContent>
          <Form {...form} className="flex flex-col items-center">
            <FormField
              control={form.control}
              name="currentPassword"
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
              name="newPassword"
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
              name="confirmPassword"
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
            <Button type="submit" className="align-middle">
              Submit
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Security;
