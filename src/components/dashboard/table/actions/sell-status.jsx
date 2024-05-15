import { useSocket } from "@/components/socketprovider/socket-provider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { useUserUpdateQuery } from "@/hooks/use-users-query";
import { useState } from "react";
import { notificationType, statusData } from "@/utils/permission";

const SellStatus = ({ row }) => {
  const [open, setOpen] = useState(false);
  const user = row.original;
  const { isSeller, ...other } = user;

  const socket = useSocket();

  const {
    mutate: approve,
    isSuccess,
    isLoading,
  } = useUserUpdateQuery(user._id);

  const handleUpdateUser = () => {
    const updateUser = { isSeller: !isSeller, ...other };
    approve({ userInfo: updateUser, id: user._id });
    socket?.emit("sendStoreApproved", {
      seller: user._id,
      type: notificationType.approvalRequest,
      createdAt: Date.now(),
    });
  };
  return (
    <>
      {isSeller ? (
        <Badge className="cursor-pointer" onClick={() => setOpen(true)}>
          Approved
        </Badge>
      ) : (
        <Badge
          className="cursor-pointer"
          onClick={() => setOpen(true)}
          variant="secondary"
        >
          Pending
        </Badge>
      )}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isSeller
                ? " Are you sure do you want to deactivate this user?"
                : " Are you sure do you want to activate this user?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently deactivate
              this account and hide some data from our users.
              {isSeller
                ? "  This action cannot be undone. This will  deactivate" +
                  "this account and hide some data from our users."
                : "  This action cannot be undone. This will  activate" +
                  "this account and unhide some data to our users."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleUpdateUser}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SellStatus;
