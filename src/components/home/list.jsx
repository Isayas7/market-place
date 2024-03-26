"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { menuItems2 } from "@/components/home/navbar/custom-sheet";
import Link from "next/link";

const List = () => {
  return (
    <>
      {menuItems2.map((category) => (
        <Accordion type="single" collapsible>
          <AccordionItem value={category.category}>
            <div className="py-2">
              <AccordionTrigger className="hover:bg-hovered py-3 px-2 rounded-md hover:no-underline">
                {category.category}
              </AccordionTrigger>
            </div>

            {category.items.map((cat, index) => (
              <AccordionContent className="hover:bg-hovered px-2 w-full rounded-md flex items-center  text-palesky">
                <Link
                  className="w-full"
                  href={`/${category.category}/${cat.title}`}
                >
                  {cat.title}
                </Link>
              </AccordionContent>
            ))}
          </AccordionItem>
        </Accordion>
      ))}
    </>
  );
};

export default List;
