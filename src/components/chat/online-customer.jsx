import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { GiPlainCircle } from "react-icons/gi";

const OnlineCustomer = ({ src, alt, name, onClick }) => {
  return (
    <div
      className="flex flex-col gap-1 items-center cursor-pointer"
      onClick={onClick}
    >
      <div className=" relative">
        <Avatar>
          <AvatarImage src={src} alt={alt} />
          <AvatarFallback>{alt}</AvatarFallback>
        </Avatar>
        <GiPlainCircle className="text-md text-green-400 absolute bottom-0 right-0" />
      </div>

      <div className=" text-xs">{name}</div>
    </div>
  );
};

export default OnlineCustomer;
