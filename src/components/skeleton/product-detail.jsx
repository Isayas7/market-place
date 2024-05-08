import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function ProductDetailSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid md:grid-cols-5 gap-3 items-start">
        <div className="flex md:hidden items-start">
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
        <div className="hidden md:flex flex-col gap-3 items-start">
          <Skeleton className="h-[120px] w-[100px] rounded-lg" />
          <Skeleton className="h-[120px] w-[100px] rounded-lg" />
          <Skeleton className="h-[120px] w-[100px] rounded-lg" />
          <Skeleton className="h-[120px] w-[100px] rounded-lg" />
        </div>
        <div className="md:col-span-4">
          <Skeleton className="h-[900px] w-full rounded-lg" />
        </div>
      </div>
      <div className="grid gap-4 md:gap-10 items-start">
        <div className="hidden md:flex items-start">
          <div className="grid gap-4">
            <Skeleton className="h-8 w-[300px] rounded-lg" />
            <Skeleton className="h-6 w-[400px] rounded-lg" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-5 w-20 rounded-lg" />
              <Skeleton className="h-5 w-20 rounded-lg" />
              <Skeleton className="h-5 w-20 rounded-lg" />
              <Skeleton className="h-5 w-20 rounded-lg" />
              <Skeleton className="h-5 w-20 rounded-lg" />
            </div>
          </div>
          <div className="text-4xl font-bold ml-auto">
            <Skeleton className="h-8 w-24 rounded-lg" />
          </div>
        </div>
        <form className="grid gap-4 md:gap-10">
          <div className="grid gap-2">
            <Label className="text-base" htmlFor="color">
              <Skeleton className="h-4 w-20 rounded-lg" />
            </Label>
            <RadioGroup
              className="flex items-center gap-2"
              defaultValue="black"
              id="color"
            >
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="color-black"
              >
                <RadioGroupItem id="color-black" value="black" />
                <Skeleton className="h-4 w-16 rounded-lg" />
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="color-white"
              >
                <RadioGroupItem id="color-white" value="white" />
                <Skeleton className="h-4 w-16 rounded-lg" />
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="color-blue"
              >
                <RadioGroupItem id="color-blue" value="blue" />
                <Skeleton className="h-4 w-16 rounded-lg" />
              </Label>
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label className="text-base" htmlFor="size">
              <Skeleton className="h-4 w-20 rounded-lg" />
            </Label>
            <RadioGroup
              className="flex items-center gap-2"
              defaultValue="m"
              id="size"
            >
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="size-xs"
              >
                <RadioGroupItem id="size-xs" value="xs" />
                <Skeleton className="h-4 w-8 rounded-lg" />
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="size-s"
              >
                <RadioGroupItem id="size-s" value="s" />
                <Skeleton className="h-4 w-8 rounded-lg" />
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="size-m"
              >
                <RadioGroupItem id="size-m" value="m" />
                <Skeleton className="h-4 w-8 rounded-lg" />
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="size-l"
              >
                <RadioGroupItem id="size-l" value="l" />
                <Skeleton className="h-4 w-8 rounded-lg" />
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="size-xl"
              >
                <RadioGroupItem id="size-xl" value="xl" />
                <Skeleton className="h-4 w-8 rounded-lg" />
              </Label>
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label className="text-base" htmlFor="quantity">
              <Skeleton className="h-4 w-20 rounded-lg" />
            </Label>
            <Select defaultValue="1">
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button size="lg">
            <Skeleton className="h-4 w-24 rounded-lg" />
          </Button>
        </form>
      </div>
    </div>
  );
}
