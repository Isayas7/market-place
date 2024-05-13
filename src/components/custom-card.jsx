"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Card } from "./ui/card";
import ReactStars from "react-rating-stars-component";

export const CustomCard = ({ product, aspectRatio, className, ...props }) => {
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
          <p className="text-xs text-muted-foreground">{product.price}</p>
          <div className="flex items-center gap-3">
            <ReactStars
              count={5}
              value={product?.averageStar}
              edit={false}
              size={24}
              activeColor="#ffd700"
            />
            <span>{product?.averageStar} out of 5</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

function calculateDiscountPercentage(originalPrice, discountAmount) {
  return (discountAmount / originalPrice) * 100;
}
