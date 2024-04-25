"use client";
import { CustomCardSeller } from "@/components/custom-card-seller";
import { Button } from "@/components/ui/button";
import {
  useCurrentSellerProductQuery,
  useCurrentSellerAllProductQuery,
} from "@/hooks/use-product-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SellerProduct = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const { data: products, isLoading } = useCurrentSellerProductQuery(
    session?.user?.id
  );

  const { data: allProducts, isFetching } = useCurrentSellerAllProductQuery(
    session?.user?.id
  );

  const uniqueCategoryNames = [
    ...new Set(allProducts?.data.map((item) => item.categoryName)),
  ];

  if (status === "loading" && isLoading) {
    return (
      <div className="flex items-center justify-center h-1/2">
        <AiOutlineLoading3Quarters className="text-5xl text-jade animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between mb-5">
        {allProducts?.data ? (
          <div className="flex gap-5 flex-wrap">
            <Link href={pathname}>
              <Button variant="outline">All</Button>
            </Link>
            {uniqueCategoryNames?.map((category, index) => (
              <Link
                href={{
                  query: {
                    categoryName: category,
                  },
                }}
              >
                <Button variant="outline" key={index}>
                  {category}
                </Button>
              </Link>
            ))}
          </div>
        ) : (
          <AiOutlineLoading3Quarters className="text-5xl text-jade animate-spin" />
        )}

        <Link href={"/seller/product/new"}>
          <Button className="justify-self-end">Add+</Button>
        </Link>
      </div>
      {products?.data ? (
        <div className="grid  grid-cols-2  md:grid-cols-3 lg:grid-cols-4  gap-5">
          {products?.data.map((product, index) => (
            <CustomCardSeller
              key={index}
              product={product}
              className="cursor-pointer"
              width={250}
              height={330}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-1/2">
          <AiOutlineLoading3Quarters className="text-5xl text-jade animate-spin" />
        </div>
      )}
    </div>
  );
};

export default SellerProduct;
