"use client";

import { Category } from "@prisma/client";
import clsx from "clsx";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  currentCategoryId?: string;
  categories?: Category[];
}

export const CategoriesTabBar = ({ currentCategoryId, categories }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  // console.log({ pathname });
  const [selected, setSelected] = useState(currentCategoryId);

  const onTabSelected = (tab: string) => {
    setSelected(tab);
    setCookie("selectedCategoryId", tab);
    router.refresh();
  };

  // return (
  //   <div className={`flex items-center flex-wrap justify-center space-x-2`}>
  //     <div key={0}>
  //       <input
  //         checked={selected === 0}
  //         onChange={() => {}}
  //         type="radio"
  //         id={"0"}
  //         className="peer hidden"
  //       />
  //       <label
  //         className="block cursor-pointer select-none rounded-full py-2 px-4 text-center peer-checked:bg-primary peer-checked:font-bold peer-checked:text-white font-body"
  //         onClick={() => onTabSelected(0)}
  //       >
  //         {`All`}
  //       </label>
  //     </div>
  //     {categories &&
  //       categories.length > 0 &&
  //       categories?.map((category) => (
  //         <div key={category.id}>
  //           <input
  //             checked={selected === category.id}
  //             onChange={() => {}}
  //             type="radio"
  //             id={category.id.toString()}
  //             className="peer hidden"
  //           />
  //           <label
  //             className="block cursor-pointer select-none rounded-full py-2 px-4 text-center peer-checked:bg-primary peer-checked:font-bold peer-checked:text-white font-body"
  //             onClick={() => onTabSelected(category.id)}
  //           >
  //             {category.title}
  //           </label>
  //         </div>
  //       ))}
  //   </div>
  // );

  return (
    <div className={`flex items-center flex-wrap justify-center space-x-2`}>
      <div key={"0"}>
        <Link
          href="/shop"
          className={clsx(
            `block cursor-pointer select-none rounded-full py-2 px-4 text-center peer-checked:bg-primary peer-checked:font-bold peer-checked:text-white font-body`,
            {
              "bg-primary text-white": pathname === "/shop",
            }
          )}
        >
          {`Todas`}
        </Link>
      </div>
      {categories &&
        categories.length > 0 &&
        categories?.map((category) => (
          <div key={category.id}>
            <Link
              href={`/category/${category.slug}`}
              className={`block cursor-pointer select-none rounded-full py-2 px-4 text-center peer-checked:bg-primary peer-checked:font-bold peer-checked:text-white font-body ${
                currentCategoryId === category.id ? "bg-primary text-white" : ""
              }`}
            >
              {category.title}
            </Link>
          </div>
        ))}
    </div>
  );
};
