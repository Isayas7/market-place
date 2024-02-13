import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const Users = () => {
  return (
    <div>
      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger value="account">Buyer</TabsTrigger>
          <TabsTrigger value="password">Seller</TabsTrigger>
          <TabsTrigger value="personnel">Pesonnel Delivery</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
        <TabsContent value="personnel" className="flex justify-between">
          <div></div>
          <Link href="user/new">+ New personnel Delivery </Link>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Users;
