import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";

export default function ProductListSkeleton() {
  return (
    <div className="grid md:grid-cols-[240px_1fr] gap-8 p-4 md:p-6">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 space-y-6">
        <div>
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="grid gap-2 mt-4">
            <Label className="flex items-center gap-2 font-normal">
              <Skeleton className="h-5 w-5 rounded-md" />
              <Skeleton className="h-4 w-24" />
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Skeleton className="h-5 w-5 rounded-md" />
              <Skeleton className="h-4 w-24" />
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Skeleton className="h-5 w-5 rounded-md" />
              <Skeleton className="h-4 w-24" />
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Skeleton className="h-5 w-5 rounded-md" />
              <Skeleton className="h-4 w-24" />
            </Label>
          </div>
        </div>
        <div>
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="grid gap-2 mt-4">
            <Label className="flex items-center gap-2 font-normal">
              <Skeleton className="h-5 w-5 rounded-md" />
              <Skeleton className="h-4 w-24" />
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Skeleton className="h-5 w-5 rounded-md" />
              <Skeleton className="h-4 w-24" />
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Skeleton className="h-5 w-5 rounded-md" />
              <Skeleton className="h-4 w-24" />
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Skeleton className="h-5 w-5 rounded-md" />
              <Skeleton className="h-4 w-24" />
            </Label>
          </div>
        </div>
        <div>
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="grid gap-2 mt-4">
            <Label className="flex items-center gap-2 font-normal">
              <Skeleton className="h-5 w-5 rounded-md" />
              <Skeleton className="h-4 w-24" />
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Skeleton className="h-5 w-5 rounded-md" />
              <Skeleton className="h-4 w-24" />
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Skeleton className="h-5 w-5 rounded-md" />
              <Skeleton className="h-4 w-24" />
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Skeleton className="h-5 w-5 rounded-md" />
              <Skeleton className="h-4 w-24" />
            </Label>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 mb-6">
          <div className="grid gap-1">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-5 w-64" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="ml-auto shrink-0" variant="outline">
                <ArrowUpDownIcon className="w-4 h-4 mr-2" />
                Sort by
              </Button>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-sm">
            <Skeleton className="w-full h-60 rounded-t-lg" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-6 w-32" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-sm">
            <Skeleton className="w-full h-60 rounded-t-lg" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-6 w-32" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-sm">
            <Skeleton className="w-full h-60 rounded-t-lg" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-6 w-32" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-sm">
            <Skeleton className="w-full h-60 rounded-t-lg" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-6 w-32" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-20" />

                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-sm">
            <Skeleton className="w-full h-60 rounded-t-lg" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-6 w-32" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-sm">
            <Skeleton className="w-full h-60 rounded-t-lg" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-6 w-32" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowUpDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21 16-4 4-4-4" />
      <path d="M17 20V4" />
      <path d="m3 8 4-4 4 4" />
      <path d="M7 4v16" />
    </svg>
  );
}
