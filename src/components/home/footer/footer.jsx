"use client";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const currentUrl = usePathname();

  return (
    <div
      className={`container mx-auto transition-all duration-300 px-4 border-t border-slate-900/10 dark:border-slate-300/10 flex items-center justify-center ${
        currentUrl === "/" ? "" : "hidden"
      }`}
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
      repellendus molestiae consectetur, perferendis at natus nihil? Harum
      aspernatur earum eos facere minus, consectetur saepe at, nihil
      exercitationem sit repellat expedita necessitatibus sint, veritatis
      molestiae eveniet fugiat aliquam nulla error illum doloribus mollitia
      tenetur est. Saepe ipsum culpa dicta commodi consequatur quibusdam
      doloribus inventore, at voluptatum, dolor temporibus quia! Nam
      reprehenderit fugit tempora laborum eos perspiciatis quisquam illum saepe
      ex blanditiis amet, dolores incidunt. Adipisci illo inventore repudiandae!
      Harum consequatur laudantium tempore nesciunt a rem quaerat, architecto
      temporibus voluptate modi aliquam dolorem quia distinctio tenetur id
      laboriosam nam. Dolores perferendis omnis optio, recusandae, perspiciatis
      explicabo ipsa consectetur deserunt minus placeat quo in aut cum amet
      assumenda, excepturi alias nostrum! Nulla sit sint adipisci sapiente odit
      molestias maxime magni, laboriosam nemo suscipit autem magnam
      reprehenderit molestiae sed qui labore, quas dolore iure possimus? Dolores
      maiores eos aspernatur corrupti, dicta consequatur ipsum quo maxime eius
      cum hic laboriosam provident enim optio distinctio animi reiciendis odit,
      ducimus delectus illum. Ad et veritatis dolorum architecto earum tenetur
      quos, ab voluptatem eaque ducimus, sint ex recusandae a eos ullam
      provident! Cumque minima, nisi perferendis esse asperiores pariatur omnis
      facilis eius ut sint optio maxime dolore velit?
    </div>
  );
};

export default Footer;
