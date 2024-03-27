import CategoryList from "@/components/category/category-list";
import { CustomCard } from "@/components/custom-card";
import React from "react";
import { listenNowAlbums } from "../page";

const Category = ({ params }) => {
  return (
    <div className=" flex gap-5  ">
      <div className="w-80 hidden lg:flex flex-col gap-2">
        <CategoryList currentCategory={params.category} />
      </div>
      <div className=" w-full lg:ml-auto  xl:w-[70%]">
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

export default Category;
