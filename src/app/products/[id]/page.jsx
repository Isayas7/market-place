"use client";
import { CustomCard } from "@/components/custom-card";
import { Price } from "@/components/products/productdetail/Price";
import { ProductDesc } from "@/components/products/productdetail/ProductDesc";
import { ProductImage } from "@/components/products/productdetail/ProductImage";
import {
  UseSingleProductQuery,
  useSimilarProducQuery,
} from "@/hooks/use-product-query";
import { Skeleton } from "@/components/ui/skeleton";
import ProductDetailSkeleton from "@/components/skeleton/product-detail";

export default function SingleProduct({ params }) {
  const { data: product, isLoading } = UseSingleProductQuery(params.id);

  const { data: similarProduct, isLoading: isFetching } = useSimilarProducQuery(
    product?.data?.variants
  );

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }
  return (
    <>
      <div className="flex flex-col md:flex-row gap-10  ">
        <div className="md:sticky top-20 self-start w-full   md:w-6/12 lg:w-5/12 xl:w-4/12 flex gap-6">
          <ProductImage images={product?.data.productImage} />
        </div>

        <div className="  flex flex-col lg:flex-row gap-6 w-full md:w-6/12 lg:w-7/12 xl:w-8/12 ">
          <div className="w-full lg:w-8/12">
            <ProductDesc descriptions={product?.data} />
          </div>
          <div className="w-full lg:w-[340px]  ">
            <Price
              price={product?.data.price}
              seller={product?.data.user}
              productId={product?.data._id}
            />
          </div>
        </div>
      </div>
      <div className=" mt-6">
        <h3 className="text-2xl">Similar products</h3>
        <div className="grid  grid-cols-2  md:grid-cols-3 lg:grid-cols-4  gap-5">
          {similarProduct?.data?.map((product, index) => (
            <CustomCard
              key={index}
              product={product}
              className="cursor-pointer"
            />
          ))}
        </div>
      </div>
    </>
  );
}
