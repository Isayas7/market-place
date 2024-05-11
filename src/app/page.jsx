"use client";
import List from "@/components/home/list";
import { CustomCard } from "@/components/custom-card";
import { useProductQuery } from "@/hooks/use-product-query";

export default function Home() {
  const { data: products, isLoading } = useProductQuery();

  return (
    <div className="xl:flex gap-7  w-full">
      <div className="  h-[calc(100vh-57px)] group sticky top-[57px] pt-2 xl:flex  hover:overflow-y-scroll overflow-y-hidden hidden  w-80 pr-4  border-r border-slate-900/10 dark:border-slate-300/10">
        <div className="w-full">
          <List />
        </div>
        <div className=" w-[8px]  group-hover:hidden  " />
      </div>
      <div className=" w-full py-2">
        <h1 className="mb-2 text-xl">Trending</h1>
        <div className=" grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {products?.data?.map((product, index) => (
            <CustomCard
              key={index}
              product={product}
              className="cursor-pointer"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
