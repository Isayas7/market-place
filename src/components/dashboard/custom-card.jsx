import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";

const CustomCard = () => {
  return (
    <div>
      <Card className=" flex-1">
        <CardHeader>
          <CardTitle>Welcome back 👋 Jaydon Frankie</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            If you are going to use a passage of Lorem Ipsum, you need to be
            sure there isn't anything.
          </p>
        </CardContent>
        <CardFooter>
          <Button>Go Now</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CustomCard;
