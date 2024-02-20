"use client";
import React, { useState } from "react";
import { menuItems } from "./navbar/custom-sheet";
import Link from "next/link";
import Image from "next/image";

const List = () => {
  const [categoryName, setCategoryName] = useState();
  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <div
        onMouseLeave={() => setIsHover(false)}
        className=" bg-card text-card-foreground   hidden xl:flex flex-col relative shadow-lg h-96 pt-1 w-80"
      >
        {menuItems.map((category) => {
          return (
            <Link
              href={{
                pathname: "/category",
                query: { category: category.category },
              }}
            >
              <div
                key={category.category}
                onMouseEnter={() => {
                  setIsHover(true);
                  setCategoryName(category.category);
                }}
                className="flex justify-between items-center px-3 py-1 hover:bg-active-hovered cursor-pointer w-full"
              >
                <div className=" flex gap-5 items-center">
                  <Image
                    src="/cru2.jpg"
                    alt="sss"
                    width={100}
                    height={100}
                    className=" w-10 h-10"
                  />
                  <div className=" flex flex-col">
                    <span>{category.category}</span>
                    <span className=" text-xs text-gray-400">1,250 ads</span>
                  </div>
                </div>
                <span>{">"}</span>
              </div>
            </Link>
          );
        })}
        {isHover && (
          <div className="bg-card text-card-foreground flex flex-col w-full border-l-2 pt-1 border-input shadow-lg absolute inset-y-0 inset-x-full z-10  h-96">
            {menuItems.map((category, categoryIndex) => {
              if (categoryName === category.category) {
                return category.items.map((cat, index) => (
                  <Link
                    key={index}
                    href="/product"
                    className="hover:bg-hovered"
                  >
                    <div className="flex justify-between items-center px-3 py-1 cursor-pointer">
                      <div className="flex space-x-4 items-center">
                        <Image
                          src="/cru1.jpeg"
                          alt="sss"
                          width={100}
                          height={100}
                          className=" w-10 h-10"
                        />
                        <div className="flex flex-col">
                          <span>{cat.title}</span>
                          <span className="text-xs text-gray-400">
                            1,250 ads
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ));
              }
              return null;
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default List;
