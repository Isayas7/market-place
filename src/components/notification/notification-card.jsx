import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RiCheckDoubleFill } from "react-icons/ri";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";
import {
  UseNotificationQuery,
  useNotificationUpdateQuery,
} from "@/hooks/use-notification-query";
import { format } from "timeago.js";
import { useRouter } from "next/navigation";

const NotificationCard = ({ setDrawerOpen }) => {
  const router = useRouter();

  const { data: notification } = UseNotificationQuery();
  const { mutate: update } = useNotificationUpdateQuery();

  const handleMessageNotificationClick = (notificationInfo, id) => {
    update({ notificationInfo: notificationInfo, id: id });
    router.push("/chat");
    setDrawerOpen(false);
  };

  return (
    <div>
      <div className="border-b-2 flex justify-between items-center py-2 px-2 ">
        <div className="text-lg font-semibold  text-black dark:text-white ">
          Notifications
        </div>
        <RiCheckDoubleFill className="text-jade" />
      </div>
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">
            All
            <span className="bg-black ml-1 text-xs p-1 text-white dark:bg-white dark:text-black rounded-sm ">
              {notification?.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            <span className="bg-sky-400 ml-1 text-xs p-1 text-white rounded-sm ">
              {
                notification?.filter(
                  (notify) => notify.notificationStatus === "unseen"
                ).length
              }
            </span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          {notification?.map((notify, index) => {
            if (notify.notificationType === "message") {
              return (
                <div
                  key={index}
                  onClick={() => {
                    const { notificationStatus, notificationCount, ...other } =
                      notify;
                    const notificationInfo = {
                      notificationStatus: "seen",
                      notificationCount: 0,
                      ...other,
                    };
                    handleMessageNotificationClick(
                      notificationInfo,
                      notify._id
                    );
                  }}
                  className=" message flex gap-2 border-t-2 py-4 hover:bg-slate-200 hover:dark:bg-mirage-200 pl-2 items-center"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="message.png" alt="man" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="text-xs">
                      {notify.notificationCount > 0
                        ? "You have new message " +
                          notify.notificationCount +
                          " unread message"
                        : "You have seen message 5+ seen message"}
                    </div>
                    <div className="text-xs">{format(notify.createdAt)}</div>
                  </div>
                </div>
              );
            } else if (notify.notificationType === "storeApproval") {
              return (
                <div
                  key={index}
                  className="approval-request flex gap-2 border-t-2 py-2 hover:bg-slate-200 hover:dark:bg-mirage-200  pl-2"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="man"
                    />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="text-xs">
                      <span className="font-semibold">Ebisa Girma</span> store
                      approval request
                    </div>
                    <div className="text-xs">
                      {" "}
                      about 1 hour ago Communication
                    </div>
                    <div className="space-x-2">
                      <Button className="h-8">Accept</Button>
                      <Button variant="outline" className="h-8">
                        Decline
                      </Button>
                    </div>
                  </div>
                </div>
              );
            } else if (notify.notificationType === "storeApproval") {
              return (
                <div
                  key={index}
                  className=" message flex gap-2 border-t-2 py-4 hover:bg-slate-200 hover:dark:bg-mirage-200 pl-2 items-center"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="delivery.png" alt="man" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="text-xs">
                      Delivery Processing your order is being shipped
                    </div>
                    <div className="text-xs"> 6 hour ago Communication</div>
                  </div>
                </div>
              );
            } else if (notify.notificationType === "storeApproval") {
              return (
                <div
                  key={index}
                  className=" message flex gap-2 border-t-2 py-4 hover:bg-slate-200 hover:dark:bg-mirage-200 pl-2 items-center"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="order.png" alt="man" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="text-xs">
                      Your order is placed waiting for shipping
                    </div>
                    <div className="text-xs"> 6 hour ago Communication</div>
                  </div>
                </div>
              );
            } else if (notify.notificationType === "storeApproval") {
              return (
                <div
                  key={index}
                  className="approval-request flex gap-2 border-t-2 py-2 hover:bg-slate-200 hover:dark:bg-mirage-200  pl-2"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="man"
                    />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="text-xs">
                      <span className="font-semibold">Ebisa Girma</span> is
                      asking for products
                    </div>
                    <div className="text-xs">
                      about 1 hour ago Communication
                    </div>
                    <div className="space-x-2">
                      <Button className="h-8">Accept</Button>
                      <Button variant="outline" className="h-8">
                        Decline
                      </Button>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </TabsContent>
        <TabsContent value="unread">
          {notification?.map((notify, index) => {
            if (
              notify.notificationType === "message" &&
              notify.notificationStatus === "unseen"
            ) {
              return (
                <div
                  key={index}
                  className=" message flex gap-2 border-t-2 py-4 hover:bg-slate-200 hover:dark:bg-mirage-200 pl-2 items-center"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="message.png" alt="man" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="text-xs">
                      {notify.notificationCount > 0
                        ? "You have new message " +
                          notify.notificationCount +
                          " unread message"
                        : "You have seen message 5+ seen message"}
                    </div>
                    <div className="text-xs">{format(notify.updatedAt)}</div>
                  </div>
                </div>
              );
            } else if (
              notify.notificationType === "storeApproval" &&
              notify.notificationStatus === "unseen"
            ) {
              return (
                <div
                  key={index}
                  className="approval-request flex gap-2 border-t-2 py-2 hover:bg-slate-200 hover:dark:bg-mirage-200  pl-2"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="man"
                    />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="text-xs">
                      <span className="font-semibold">Ebisa Girma</span> store
                      approval request
                    </div>
                    <div className="text-xs">
                      about 1 hour ago Communication
                    </div>
                    <div className="space-x-2">
                      <Button className="h-8">Accept</Button>
                      <Button variant="outline" className="h-8">
                        Decline
                      </Button>
                    </div>
                  </div>
                </div>
              );
            } else if (
              notify.notificationType === "storeApproval" &&
              notify.notificationStatus === "unseen"
            ) {
              return (
                <div
                  key={index}
                  className=" message flex gap-2 border-t-2 py-4 hover:bg-slate-200 hover:dark:bg-mirage-200 pl-2 items-center"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="delivery.png" alt="man" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="text-xs">
                      Delivery Processing your order is being shipped
                    </div>
                    <div className="text-xs"> 6 hour ago Communication</div>
                  </div>
                </div>
              );
            } else if (
              notify.notificationType === "storeApproval" &&
              notify.notificationStatus === "unseen"
            ) {
              return (
                <div
                  key={index}
                  className=" message flex gap-2 border-t-2 py-4 hover:bg-slate-200 hover:dark:bg-mirage-200 pl-2 items-center"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="order.png" alt="man" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="text-xs">
                      Your order is placed waiting for shipping
                    </div>
                    <div className="text-xs"> 6 hour ago Communication</div>
                  </div>
                </div>
              );
            } else if (
              notify.notificationType === "storeApproval" &&
              notify.notificationStatus === "unseen"
            ) {
              return (
                <div
                  key={index}
                  className="approval-request flex gap-2 border-t-2 py-2 hover:bg-slate-200 hover:dark:bg-mirage-200  pl-2"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="man"
                    />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="text-xs">
                      <span className="font-semibold">Ebisa Girma</span> is
                      asking for products
                    </div>
                    <div className="text-xs">
                      about 1 hour ago Communication
                    </div>
                    <div className="space-x-2">
                      <Button className="h-8">Accept</Button>
                      <Button variant="outline" className="h-8">
                        Decline
                      </Button>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationCard;
