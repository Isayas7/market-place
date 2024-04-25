import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export const ProductImage = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  return (
    <>
      <div className=" w-[80%]  md:w-full  overflow-hidden rounded-md ">
        <Image
          src={images && images[selectedImage]}
          alt={"product"}
          width={700}
          height={800}
          className={"  w-full h-full   object-cover aspect-[3/4]"}
        />
      </div>
      <div className="flex flex-col gap-5 items-start  ">
        {images?.map((img, index) => (
          <div
            onMouseEnter={() => setSelectedImage(index)}
            key={index}
            className={`${
              selectedImage === index ? " border border-red-400" : ""
            } flex  items-center space-y-1 p-1 hover:bg-slate-600 rounded-md`}
          >
            <Image
              src={img}
              alt=";;"
              width={250}
              height={330}
              className="aspect-square size-12 rounded-md  "
            />
          </div>
        ))}
      </div>
    </>
  );
};
