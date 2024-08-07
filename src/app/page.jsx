"use client";
import List from "@/components/home/list";
import { CustomCard } from "@/components/custom-card";
import { useAllProductQuery } from "@/hooks/use-product-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: AllProducts, isLoading } = useAllProductQuery();

  return (
    <div className="xl:flex gap-7  w-full">
      <div className="  h-[calc(100vh-57px)] group sticky top-[57px] pt-2 xl:flex  hover:overflow-y-scroll overflow-y-hidden hidden  w-80 pr-4  border-r border-slate-900/10 dark:border-slate-300/10">
        <div className="w-full">
          <List />
        </div>
        <div className=" w-[8px]  group-hover:hidden  " />
      </div>
      <div className=" w-full  py-2">
        <div className="my-2 ">
          <div className="flex justify-between items-center">
            <span className="cursor-pointer text-2xl my-2">Products</span>
            {/* <Button>Trending</Button> */}
          </div>
          <Separator />
        </div>

        {isLoading ? (
          <div className="flex  justify-center h-screen ">
            <AiOutlineLoading3Quarters className="text-5xl text-jade animate-spin" />
          </div>
        ) : (
          <div className=" grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {AllProducts?.data?.map((product, index) => (
              <CustomCard
                key={index}
                product={product}
                className="cursor-pointer"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
