import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function CustomerCard({ name, time, message, onClick, isActive }) {
  return (
    <div
      onClick={onClick}
      className={`flex flex-row gap-2 p-2 items-center cursor-pointer  ${
        isActive
          ? "bg-active text-jade hover:bg-active-hovered"
          : "hover:bg-hovered text-palesky"
      }`}
    >
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <div>{name}</div>
        <div>
          {message
            ? message.length > 15
              ? message.substring(0, 15) + "..."
              : message
            : "Sent Product"}
        </div>
      </div>
    </div>
  );
}
