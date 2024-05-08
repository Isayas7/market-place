/**
 * v0 by Vercel.
 * @see https://v0.dev/t/FRM7LANkWke
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Skeleton } from "@/components/ui/skeleton";
import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EyeIcon } from "lucide-react";

export default function OrderDetailSkeleton() {
  return (
    <>
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="grid md:grid-cols-6 gap-6 mt-6">
        <div className="md:col-span-4 lg:col-span-3 xl:col-span-4 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-4 w-[150px]" />
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center">
                <div>
                  <Skeleton className="h-4 w-[100px]" />
                </div>
                <div className="ml-auto">
                  <Skeleton className="h-4 w-[80px]" />
                </div>
              </div>
              <div className="flex items-center">
                <div>
                  <Skeleton className="h-4 w-[100px]" />
                </div>
                <div className="ml-auto">
                  <Skeleton className="h-4 w-[80px]" />
                </div>
              </div>
              <Separator />
              <div className="flex items-center font-medium">
                <div>
                  <Skeleton className="h-4 w-[100px]" />
                </div>
                <div className="ml-auto">
                  <Skeleton className="h-4 w-[80px]" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex items-center gap-2">
              <Button size="sm">
                <Skeleton className="h-4 w-[100px]" />
              </Button>
              <Button size="sm" variant="outline">
                <Skeleton className="h-4 w-[100px]" />
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-4 w-[150px]" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px] hidden md:table-cell">
                      <Skeleton className="h-4 w-[80px]" />
                    </TableHead>
                    <TableHead className="max-w-[150px]">
                      <Skeleton className="h-4 w-[150px]" />
                    </TableHead>
                    <TableHead>
                      <Skeleton className="h-4 w-[80px]" />
                    </TableHead>
                    <TableHead>
                      <Skeleton className="h-4 w-[80px]" />
                    </TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="hidden md:table-cell">
                      <Skeleton className="h-16 w-16 rounded" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[150px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[50px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[80px]" />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Button size="icon" variant="outline">
                        <EyeIcon className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2 lg:col-span-3 xl:col-span-2 flex flex-col gap-6">
          <Card>
            <div>
              <CardHeader className="flex flex-row items-center space-y-0">
                <CardTitle>
                  <Skeleton className="h-4 w-[150px]" />
                </CardTitle>
                <Button className="ml-auto" variant="secondary">
                  <Skeleton className="h-4 w-[80px]" />
                </Button>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="grid gap-1">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              </CardContent>
            </div>
            <Separator />
            <div>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-4 w-[150px]" />
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="grid gap-1">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              </CardContent>
            </div>
            <Separator />
            <div>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-4 w-[150px]" />
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <Skeleton className="h-4 w-[300px]" />
              </CardContent>
            </div>
            <Separator />
            <div>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-4 w-[150px]" />
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <Skeleton className="h-4 w-[300px]" />
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
