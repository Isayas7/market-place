"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePayQuery } from "@/hooks/use-product-query";
import { useRouter } from "next/navigation";

const Pay = () => {
  const router = useRouter();
  const { mutate: pay, isSuccess, isLoading, data } = usePayQuery();

  const onSubmit = () => {
    pay(100);
  };
  if (isSuccess) {
    router.push(data.data);
  }
  return (
    <div>
      <Card>
        <Button onClick={() => onSubmit()}>Pay</Button>
      </Card>
    </div>
  );
};

export default Pay;
