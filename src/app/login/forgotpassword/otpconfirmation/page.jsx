"use client";
import { Card } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ForgotPassword() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("OTP must be 6 characters");
      return;
    }
    if (otp === "123456") {
      router.push("otpconfirmation/setpassword");
    } else {
      setError("Invalid OTP");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20 ">
      <Card className=" p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          Enter Your OTP
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Please enter the 6-digit one-time password sent to your device.
        </p>
        <form onSubmit={onSubmit} className="flex flex-col" name="otp">
          <div className="flex items-center justify-center mb-6">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => {
                setOtp(value);
                setError("");
              }}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" className="w-full">
            Verify OTP
          </Button>
        </form>
      </Card>
    </div>
  );
}
