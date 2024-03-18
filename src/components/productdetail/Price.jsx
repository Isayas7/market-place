import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const Price = () => {
  return (
    <div className=" flex  md:flex-col gap-6 ">
      <div className=" bg-card rounded-md w-full h-fit">
        <div className="container py-3">
          <h3>ETB 400</h3>
          <Button className="  w-full mt-3  ">Request call back</Button>
        </div>
      </div>
      <div className=" bg-card rounded-md  w-full h-fit">
        <div className="container py-3">
          <div className="flex gap-6 ">
            <Button variant="ghost" className="h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" alt="man" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </Button>
            <div>
              <h3>John Doe</h3>
              <h3 className="text-sm">Active on</h3>
            </div>
          </div>

          <Button className="  w-full mt-3  ">Show contact</Button>
          <Button className="  w-full mt-3  ">Show contact</Button>
        </div>
      </div>
      <div className=" bg-card rounded-md  w-full h-fit">
        <div className="container py-3">
          <h3 className="text-center">Safety tips</h3>

          <ul>
            {" "}
            <li>Lorem ipsum dolor sit amet.</li>{" "}
            <li>Lorem ipsum dolor sit amet.</li>{" "}
            <li>Lorem ipsum dolor sit amet.</li>{" "}
            <li>Lorem ipsum dolor sit amet.</li>{" "}
            <li>Lorem ipsum dolor sit amet.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
