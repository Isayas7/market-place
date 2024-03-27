import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "../ui/card";

export function CustomerCard({ name, message, time }) {
  return (
    <div className="flex flex-row gap-2 p-2">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <div>{name}</div>
        <div>{message}</div>
      </div>
    </div>
  );
}
