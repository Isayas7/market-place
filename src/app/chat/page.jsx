import { CustomerCard } from "@/components/chat/friend-card";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import React from "react";

const Chat = () => {
  const customers = [
    {
      id: "728ed52f",
      email: "nonummy.ut@protonmail.ca",
      amount: 6,
      status: "backlog",
    },
    {
      id: "728ed52e",
      email: "consectetuer.rhoncus@outlook.edu",
      amount: 3,
      status: "backlog",
    },
    {
      id: "728ed52q",
      email: "dolor.fusce@aol.org",
      amount: 4,
      status: "todo",
    },
    {
      id: "728ed52s",
      email: "mauris@aol.ca",
      amount: 8,
      status: "in progress",
    },
    {
      id: "728ed52c",
      email: "nullam@yahoo.couk",
      amount: 5,
      status: "in progress",
    },
    {
      id: "728ed52f",
      email: "nonummy.ut@protonmail.ca",
      amount: 6,
      status: "canceled",
    },
    {
      id: "728ed52e",
      email: "consectetuer.rhoncus@outlook.edu",
      amount: 3,
      status: "canceled",
    },
    {
      id: "728ed52q",
      email: "dolor.fusce@aol.org",
      amount: 4,
      status: "backlog",
    },
    {
      id: "728ed52s",
      email: "mauris@aol.ca",
      amount: 8,
      status: "canceled",
    },
    {
      id: "728ed52c",
      email: "nullam@yahoo.couk",
      amount: 5,
      status: "todo",
    },
    {
      id: "728ed52f",
      email: "nonummy.ut@protonmail.ca",
      amount: 6,
      status: "backlog",
    },
    {
      id: "728ed52e",
      email: "consectetuer.rhoncus@outlook.edu",
      amount: 3,
      status: "backlog",
    },
    {
      id: "728ed52q",
      email: "dolor.fusce@aol.org",
      amount: 4,
      status: "todo",
    },
    {
      id: "728ed52s",
      email: "mauris@aol.ca",
      amount: 8,
      status: "in progress",
    },
    {
      id: "728ed52c",
      email: "nullam@yahoo.couk",
      amount: 5,
      status: "in progress",
    },
    {
      id: "728ed52f",
      email: "nonummy.ut@protonmail.ca",
      amount: 6,
      status: "canceled",
    },
    {
      id: "728ed52e",
      email: "consectetuer.rhoncus@outlook.edu",
      amount: 3,
      status: "canceled",
    },
    {
      id: "728ed52q",
      email: "dolor.fusce@aol.org",
      amount: 4,
      status: "backlog",
    },
    {
      id: "728ed52s",
      email: "mauris@aol.ca",
      amount: 8,
      status: "canceled",
    },
    {
      id: "728ed52c",
      email: "nullam@yahoo.couk",
      amount: 5,
      status: "todo",
    },
  ];

  return (
    <div className="h-screen">
      <Card className="flex  sticky top-[70px]  h-[85%] ">
        <div className=" w-1/4 border-r-2 p-2 hidden xl:block ">
          <CustomerCard
            name={"Isayas Melkamu"}
            message={"customer.status"}
            time={"customer.amount"}
          />
          <Input placeholder={"Search contacts"} className="max-w-sm" />
          <div className=" space-y-2   h-[85%]  overflow-y-scroll">
            {customers.map((customer) => (
              <CustomerCard
                key={customer.id}
                name={customer.email}
                message={customer.status}
                time={customer.amount}
              />
            ))}
          </div>
        </div>

        <div className="w-3/4">
          <div className="border-b-2 flex gap-2 pl-4 py-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="overflow-y-scroll h-[80%] p-4">This</div>
          <div className="flex gap-2 border-t-2 h-[10%]  ">
            <Input
              placeholder={"Type message"}
              className="w-full rounded-none border-none border-t-2 p-4  focus:outline-dotted focus:border-none "
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Chat;
