import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { GiPlainCircle } from "react-icons/gi";

const OnlineCustomer = ({ src, alt, name, onClick }) => {
  return (
    <div
      className="flex flex-col items-center relative cursor-pointer"
      onClick={onClick}
    >
      <Avatar>
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback>{alt}</AvatarFallback>
      </Avatar>
      <div className="mt-1">{name}</div>
      <GiPlainCircle className="text-md text-green-400 absolute bottom-5 right-1" />
    </div>
  );
};

export default OnlineCustomer;
