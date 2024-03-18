import React from "react";

export const ProductDesc = () => {
  return (
    <div className=" flex flex-col   ">
      <div className=" flex flex-col gap-5 md:w-full">
        <p className="   text-5xl font-bold text-[#12263a] mt-2 normal-case relative">
          prductname
          <div className=" after:bg-[#12263a] after:absolute after:left-1 after:-bottom-2 after:h-[4px] after:w-20" />
        </p>
        <p className="">
          <span className="text-[#12263a] mr-1 text-lg font-bold">Price:</span>
          <span className=" text-xl font-bold text-green-500">100 Birr</span>
        </p>
        <p className=" text-base text-brandColor font-bold ">
          Existed in mexico
        </p>
        <p className=" font-semibold ">Location : mexico</p>
      </div>
      <span className="text-[#12263a] text-lg font-bold mt-3 mb-1">
        About this item:
      </span>
      <span className=" text-base text-gray-600 ml-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, nam?
      </span>
    </div>
  );
};
