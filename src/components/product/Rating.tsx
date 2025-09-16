"use client";

import { Star } from "@/components/product/Star";

interface Props {
  rating: number;
}

export const Rating = ({ rating }: Props) => {
  return (
    <div className="flex items-center justify-start gap-2">
      <span className=" text-text-primary text-md font-semibold dark:text-white ">
        {`${rating}`}
      </span>
      <div className="flex items-center space-x-1 rtl:space-x-reverse">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Star
              key={index}
              className={`${
                rating < index + 1 ? "text-gray-300" : "text-yellow-300"
              }`}
            />
          ))}
      </div>
    </div>
  );
};
