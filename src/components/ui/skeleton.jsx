import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-[#A8E2CD]", className)}
      {...props}
    />
  );
}

export { Skeleton };
