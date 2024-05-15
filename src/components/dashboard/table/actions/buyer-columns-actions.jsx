import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { MoreHorizontal } from "lucide-react";
import { useUserDeactivateQuery } from "@/hooks/use-users-query";
import { statusData } from "@/utils/permission";
import { useState } from "react";

const BuyerColumnsActions = ({ row }) => {
  const [open, setOpen] = useState(false);
  const user = row.original;
  const { status } = user;

  const { mutate: deactivate, isSuccess, isLoading } = useUserDeactivateQuery();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setOpen(true)}>
          {status === statusData.Active ? "Deactivate" : "Activate"}
        </DropdownMenuItem>
      </DropdownMenuContent>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {status === statusData.Active
                ? " Are you sure do you want to deactivate this user?"
                : " Are you sure do you want to activate this user?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently deactivate
              this account and hide some data from our users.
              {status === statusData.Active
                ? "  This action cannot be undone. This will  deactivate" +
                  "this account and hide some data from our users."
                : "  This action cannot be undone. This will  activate" +
                  "this account and unhide some data to our users."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deactivate(user._id)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DropdownMenu>
  );
};

export default BuyerColumnsActions;
