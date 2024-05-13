"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Card } from "./ui/card";
import ReactStars from "react-rating-stars-component";
import { usePathname } from "next/navigation";

export const CustomCard = ({ product, aspectRatio, className, ...props }) => {
  const path = usePathname();
  return (
    <Link href={`/products/${product._id}`}>
      <Card
        className={cn(
          "space-y-3 relative rounded-sm overflow-hidden h-full  border-none shadow",
          className
        )}
        {...props}
      >
        <div>
          <Image
            src={product.productImage[0]}
            alt={product.title}
            width={700}
            height={800}
            className={cn(
              "w-full h-full object-cover transition-all hover:scale-105",
              aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
            )}
          />
        </div>

        <div className="space-y-1 text-sm px-2 py-1 ">
          {product?.promotion?.amount &&
            new Date(product.promotion.expireDate) > new Date() && (
              <div className="absolute top-3 left-3 rounded-full bg-red-500 px-3 py-1 text-xs font-medium text-white">
                {calculateDiscountPercentage(
                  product.price,
                  product.promotion.amount
                ).toFixed(0)}
                %
              </div>
            )}
          <h3 className="font-medium leading-none">{product.title}</h3>
          {product?.promotion?.amount &&
          new Date(product?.promotion?.expireDate) > new Date() ? (
            <>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">
                  {product?.price - product?.promotion?.amount} ETB
                </div>
                <div className="text-lg font-medium text-gray-500 line-through dark:text-gray-400">
                  {product?.price} ETB
                </div>
              </div>
            </>
          ) : (
            <div className="text-2xl font-bold">{product?.price} ETB</div>
          )}
          {!path.includes("/chat") && (
            <div className="flex items-center gap-3">
              <ReactStars
                count={5}
                value={product?.averageStar}
                edit={false}
                size={24}
                activeColor="#ffd700"
                halfIcon={true}
              />
              <span>
                {product?.averageStar
                  ? product?.averageStar + " out of 5"
                  : "not rated"}
              </span>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
};

function calculateDiscountPercentage(originalPrice, discountAmount) {
  return (discountAmount / originalPrice) * 100;
}
