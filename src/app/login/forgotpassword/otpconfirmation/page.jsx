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
    <div className="flex flex-col mt-[20%] items-center justify-center">
      <Card className="p-8">
        <form onSubmit={onSubmit} className="flex flex-col" name="otp">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => {
              setOtp(value);
              setError(""); // Clear error when OTP changes
            }}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" className="mt-2">
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
}
