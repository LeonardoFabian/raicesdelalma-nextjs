"use client";

import { useEffect } from "react";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/store/index-old";
import { toggleFavorite } from "@/store/wishlist/wishlist";
import { Product as ProductUI } from "@/interfaces";
import { Product } from "@prisma/client";

interface Props {
  product: ProductUI;
  size?: number;
}

export const AddToWishlist = ({ product, size }: Props) => {
  const { id } = product;

  const isOnTheWishlist = useAppSelector(
    (state) => !!state.wishlist.favorites[id]
  );
  const dispatch = useAppDispatch();

  const onToggle = () => {
    // console.log(`Toggle favorite product ${ id }`);
    dispatch(toggleFavorite(product));
  };

  return (
    <>
      <button
        type="button"
        className={`p-1 rounded-full transition-all duration-300 cursor-pointer ${
          isOnTheWishlist
            ? " bg-primary text-white"
            : " bg-black/20 text-gray-100 hover:text-primary"
        }`}
        title={isOnTheWishlist ? "Remove from wishlist" : "Add to wishlist"}
        onClick={onToggle}
      >
        <MdOutlineFavoriteBorder size={size ?? 35} />
      </button>
    </>
  );
};
