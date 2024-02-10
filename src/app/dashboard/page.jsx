import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const Dashboard = () => {
  return (
    <div>
      <div className="flex  gap-2 ">
        <Card className="flex-2 flex  bg-largeCard text-largeCard-foreground">
          <div className="flex-2 ">
            <CardHeader>
              <CardTitle className="text-2xl">Welcome back 👋 </CardTitle>
              <CardTitle className="text-2xl">Jaydon Frankie</CardTitle>
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
          </div>
          <div className="flex-1 flex a justify-center items-center ">
            <Image
              className="h-fit "
              alt="man"
              src="https://github.com/shadcn.png"
              width={100}
              height={50}
            />
          </div>
        </Card>

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
      <div className=" flex gap-5 mt-5">
        <Card className=" flex-1 ">
          <CardHeader>
            <CardTitle>Total Active Users</CardTitle>
            <CardDescription>+2.6%</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl">18,765</p>
          </CardContent>
          <CardFooter>
            <Button>View</Button>
          </CardFooter>
        </Card>
        <Card className=" flex-1">
          <CardHeader>
            <CardTitle>Total Active Users</CardTitle>
            <CardDescription>+2.6%</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl">18,765</p>
          </CardContent>
          <CardFooter>
            <Button>View</Button>
          </CardFooter>
        </Card>
        <Card className=" flex-1">
          <CardHeader>
            <CardTitle>Total Active Users</CardTitle>
            <CardDescription>+2.6%</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl">18,765</p>
          </CardContent>
          <CardFooter>
            <Button>View</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
