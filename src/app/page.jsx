"use client";
import List from "@/components/home/list";
import { CustomCard } from "@/components/custom-card";
import { useProductQuery } from "@/hooks/use-product-query";

export const listenNowAlbums = [
  {
    category: "electronics",
    type: "tablet",
    productName: "tablet-1",
    price: "3000",
    cover:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "electronics",
    type: "tablet",
    productName: "tablet-2",
    price: "36000",
    cover:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "clothing",
    type: "t-shirt",
    productName: "t-shirt-1",
    price: "3600",
    cover:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "clothing",
    type: "t-shirt",
    productName: "t-shirt-2",
    price: "2600",
    cover:
      "https://images.unsplash.com/photo-1592343516109-362f7bd871aa?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "clothing",
    type: "coat",
    productName: "coat-1",
    price: "36000",
    cover:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "clothing",
    type: "coat",
    productName: "coat-2",
    price: "3000",
    cover:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "electronics",
    type: "mobile phone",
    productName: "apple-1",
    price: "3600",
    cover:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "electronics",
    type: "mobile phone",
    productName: "apple-2",
    price: "2600",
    cover:
      "https://images.unsplash.com/photo-1592343516109-362f7bd871aa?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "electronics",
    type: "mobile phone",
    productName: "android-1",
    price: "36000",
    cover:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "electronics",
    type: "mobile phone",
    productName: "android-2",
    price: "3000",
    cover:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "electronics",
    type: "mobile phone",
    productName: "android-3",
    price: "3600",
    cover:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "electronics",
    type: "mobile phone",
    productName: "android-4",
    price: "2600",
    cover:
      "https://images.unsplash.com/photo-1592343516109-362f7bd871aa?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

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
        <div className=" grid  grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-5 ">
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
