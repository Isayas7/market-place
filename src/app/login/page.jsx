"use client";

import LoginForm from "@/components/login/login";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Login() {
  return (
    <div className="h-screen">
      <div className="flex justify-center items-center h-full">
        <Card className="w-4/12">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Login to your account</CardTitle>
            <CardDescription>Login with below provider account</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-6">
              <Button variant="outline">Facebook</Button>
              <Button variant="outline">Google</Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
