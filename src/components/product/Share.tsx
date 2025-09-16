"use client";

// import { Product } from "@prisma/client";
import { Product as ProductUI } from "@/interfaces";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdIosShare } from "react-icons/md";

interface Props {
  product: ProductUI;
  size?: number;
}

export const Share = ({ product, size }: Props) => {
  const onClick = () => {
    // console.log(`Sharing the product with id ${product.id}`);
  };
  return (
    <>
      <button
        type="button"
        className={`rounded-full transition-all duration-300 text-text-primary hover:text-primary hover:cursor-pointer`}
        title="Share"
        onClick={() => onClick()}
      >
        <IoShareSocialOutline size={size ?? 35} />
      </button>
    </>
  );
};
