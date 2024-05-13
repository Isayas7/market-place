"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useFeedbackQuery } from "@/hooks/use-notification-query";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Link from "next/link";

export default function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { mutate: sendfeedback, isSuccess, isLoading } = useFeedbackQuery();
  const session = useSession();
  const handleFeedBack = () => {
    sendfeedback({ feedback, id: session?.data?.user?.id });
    setFeedback("");
    setSubmitted(!submitted);
  };

  if (submitted) {
    return (
      <section className="w-full max-w-2xl mx-auto  ">
        <div className="space-y-4 text-center">
          <div className="bg-green-100 dark:bg-green-900 p-6 rounded-lg">
            <CircleCheckIcon className="w-12 h-12 mx-auto text-jade dark:text-jade" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Thank you for your feedback!
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            We appreciate you taking the time to share your thoughts with us.
            Your feedback will help us improve our products and services.
          </p>
          <div className="flex flex-col gap-2 items-center w-full">
            <Button className="w-fit" onClick={() => setSubmitted(!submitted)}>
              Submit another feedback
            </Button>
            <Link href="/">
              <Button onClick={() => setSubmitted(!submitted)}>
                Back to home page
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-2xl mx-auto ">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Share your feedback
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          We value your input and want to hear your thoughts on how we can
          improve.
        </p>
      </div>
      <div className=" space-y-4">
        <div className="space-y-2">
          <Label>Put Feedback</Label>
          <Textarea
            className="min-h-[150px]"
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your thoughts..."
          />
        </div>
        <Button className="w-full" onClick={handleFeedBack}>
          {isLoading ? (
            <AiOutlineLoading3Quarters className=" text-white  animate-spin" />
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </section>
  );
}

function CircleCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
