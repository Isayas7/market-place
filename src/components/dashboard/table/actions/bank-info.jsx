import { UseBankQuery } from "@/hooks/use-users-query";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const BankInfo = ({ row }) => {
  const { data: banks, isLoading } = UseBankQuery();
  const bankName = banks?.data?.data?.find(
    (b) => b.id === row.original.bankInfo
  )?.name;

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <AiOutlineLoading3Quarters className="text-2xl text-jade animate-spin" />
        </div>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>{bankName?.slice(0, 10)}...</TooltipTrigger>
            <TooltipContent>
              <p>{bankName}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
};

export default BankInfo;
