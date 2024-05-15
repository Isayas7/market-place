import { useSocket } from "@/components/socketprovider/socket-provider";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import NotificationCard from "@/components/notification/notification-card";
import { Badge } from "@/components/ui/badge";
import { roleData } from "@/utils/permission";
import { UseRoleQuery } from "@/hooks/use-role-query";
import { UseNotificationQuery } from "@/hooks/use-notification-query";

const Notification = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notificationCounter, setNotificationCounter] = useState(0);

  const socket = useSocket();
  const session = useSession();

  const { data: notification } = UseNotificationQuery();

  useEffect(() => {
    if (!socket) return;
    socket?.on("getMessageNotification", (data) => {
      setNotificationCounter((prevCounter) => prevCounter + 1);
    });
  }, [socket]);

  return (
    <div>
      {session.status === "authenticated" && (
        <div
          className="relative cursor-pointer"
          onClick={() => {
            setDrawerOpen(!drawerOpen);
            setNotificationCounter(0);
          }}
        >
          <IoNotificationsCircleOutline className="size-8 rounded-full text-jade hover:text-white hover:bg-jade  cursor-pointe" />
          {notification?.filter(
            (notify) => notify.notificationStatus === "unseen"
          ).length +
            notificationCounter >
            0 && (
            <Badge className="absolute -top-1 -right-3 text-[10px] rounded-full bg-red-500">
              {notification?.filter(
                (notify) => notify.notificationStatus === "unseen"
              ).length + notificationCounter}
            </Badge>
          )}
        </div>
      )}

      <Drawer
        direction="right"
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        className="right-0"
      >
        <DrawerContent className="border-none overflow-y-scroll  right-0  overflow-x-hidden ">
          <NotificationCard setDrawerOpen={setDrawerOpen} />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Notification;
