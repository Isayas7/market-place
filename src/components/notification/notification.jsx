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

  const { data: rolesData, isFetching } = UseRoleQuery();
  const AdminRole = () => {
    const role = rolesData.data.find((item) => item.role === roleData.Admin);
    return role ? role._id : null;
  };

  useEffect(() => {
    if (!socket) return;
    socket?.on("getMessageNotification", (data) => {
      setNotificationCounter((prevCounter) => prevCounter + 1);
    });

    session?.data?.user?.role === AdminRole &&
      socket?.on("getStoreApprovalRequest", (data) => {
        setNotificationCounter((prevCounter) => prevCounter + 1);
      });

    socket?.on("getStoreApproved", (data) => {
      setNotificationCounter((prevCounter) => prevCounter + 1);
    });
    socket?.on("getOrderStatus", (data) => {
      setNotificationCounter((prevCounter) => prevCounter + 1);
    });
  }, [socket, AdminRole, session?.data?.user?.role]);

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
