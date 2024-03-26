import { listenNowAlbums } from "@/app/page";
import { CustomCard } from "@/components/home/custom-card";
import { Price } from "@/components/productdetail/Price";
import { ProductDesc } from "@/components/productdetail/ProductDesc";
import { ProductImage } from "@/components/productdetail/ProductImage";

export default function SingleProduct() {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-10  ">
        <div className="md:sticky top-20 self-start w-10/12   md:w-6/12 lg:w-5/12 xl:w-4/12 flex gap-6">
          <ProductImage />
        </div>

        <div className="  flex flex-col lg:flex-row gap-6 w-full md:w-6/12 lg:w-7/12 xl:w-8/12 ">
          <div className="w-full lg:w-8/12">
            <ProductDesc />
          </div>
          <div className="w-full lg:w-[340px]  ">
            <Price />
          </div>
        </div>
      </div>
      <div className=" mt-6">
        <h3 className="text-2xl">Similar products</h3>
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
    </>
  );
}
