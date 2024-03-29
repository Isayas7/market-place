import { listenNowAlbums } from "@/app/page";
import { CustomCard } from "@/components/custom-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const SellerProduct = () => {
  return (
    <div>
      <div className="flex justify-between mb-5">
        <p />
        <Link href={"/seller/product/new"}>
          <Button className="justify-self-end">Add+</Button>
        </Link>
      </div>
      <div className="grid  grid-cols-2  md:grid-cols-3 lg:grid-cols-4  gap-5">
        {listenNowAlbums.map((album) => (
          <CustomCard
            key={album.name}
            album={album}
            className="cursor-pointer"
            width={250}
            height={330}
          />
        ))}
      </div>
    </div>
  );
};

export default SellerProduct;
