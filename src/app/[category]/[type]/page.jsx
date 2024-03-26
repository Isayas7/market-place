import CategoryList from "@/components/category/category-list";
import { CustomCard } from "@/components/home/custom-card";
import React from "react";
import { listenNowAlbums } from "../../page";
import Link from "next/link";
import Image from "next/image";

const ProductType = ({ params }) => {
  return (
    <div className=" flex gap-5  ">
      <div className="w-80 hidden lg:flex flex-col gap-2">
        <CategoryList
          currentCategory={params.category}
          currentType={params.type}
        />
      </div>
      <div className=" w-full lg:ml-auto  xl:w-[70%]">
        <div className="bg-swansdown dark:bg-headercolor-default rounded-md  ">
          <div className="container mx-auto flex flex-wrap items-center gap-8  py-2 mb-2 ">
            <Link
              href={""}
              className="flex flex-col items-center space-y-1 hover:bg-slate-600 py-3 px-5 hover:rounded-md"
            >
              <Image
                src={"/toyota.png"}
                alt=";;"
                width={250}
                height={330}
                className="aspect-square size-10 rounded-md  "
              />
              <span>Toyota</span>
            </Link>
            <Link
              href={""}
              className="flex flex-col items-center space-y-1 hover:bg-slate-600 py-3 px-5 hover:rounded-md"
            >
              <Image
                src={"/toyota.png"}
                alt=";;"
                width={250}
                height={330}
                className="aspect-square size-10 rounded-md  "
              />
              <span>Toyota</span>
            </Link>
            <Link
              href={""}
              className="flex flex-col items-center space-y-1 hover:bg-slate-600 py-3 px-5 hover:rounded-md"
            >
              <Image
                src={"/toyota.png"}
                alt=";;"
                width={250}
                height={330}
                className="aspect-square size-10 rounded-md  "
              />
              <span>Toyota</span>
            </Link>
            <Link
              href={""}
              className="flex flex-col items-center space-y-1 hover:bg-slate-600 py-3 px-5 hover:rounded-md"
            >
              <Image
                src={"/toyota.png"}
                alt=";;"
                width={250}
                height={330}
                className="aspect-square size-10 rounded-md  "
              />
              <span>Toyota</span>
            </Link>
            <Link
              href={""}
              className="flex flex-col items-center space-y-1 hover:bg-slate-600 py-3 px-5 hover:rounded-md"
            >
              <Image
                src={"/toyota.png"}
                alt=";;"
                width={250}
                height={330}
                className="aspect-square size-10 rounded-md  "
              />
              <span>Toyota</span>
            </Link>
            <Link
              href={""}
              className="flex flex-col items-center space-y-1 hover:bg-slate-600 py-3 px-5 hover:rounded-md"
            >
              <Image
                src={"/toyota.png"}
                alt=";;"
                width={250}
                height={330}
                className="aspect-square size-10 rounded-md  "
              />
              <span>Toyota</span>
            </Link>
            <Link
              href={""}
              className="flex flex-col items-center space-y-1 hover:bg-slate-600 py-3 px-5 hover:rounded-md"
            >
              <Image
                src={"/toyota.png"}
                alt=";;"
                width={250}
                height={330}
                className="aspect-square size-10 rounded-md  "
              />
              <span>Toyota</span>
            </Link>
          </div>
        </div>
        <div className="grid  grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-5">
          {listenNowAlbums.map((album) => (
            <CustomCard
              key={album.name}
              album={album}
              className="cursor-pointer"
              width={250}
              height={330}
              aspectRatio="portrait"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductType;
