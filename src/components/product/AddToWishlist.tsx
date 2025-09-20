"use client";

import { MdOutlineFavoriteBorder } from "react-icons/md";
import { useWishlistStore } from "@/store";
import { addProductToWishlist, removeProductFromWishlist } from "@/actions";
import clsx from "clsx";

interface Props {
  productId: string;
}

export const AddToWishlist = ({ productId }: Props) => {
  const wishlist = useWishlistStore((state) => state.wishlist);
  const toggleStoreWishlistItem = useWishlistStore((state) => state.toggle);
  const isWishlisted = wishlist.includes(productId);

  // const isOnTheWishlist = useAppSelector(
  //   (state) => !!state.wishlist.favorites[id]
  // );
  // const dispatch = useAppDispatch();

  const handleClick = async () => {
    // console.log(`Toggle favorite product ${ id }`);
    // dispatch(toggleFavorite(product));
    if (isWishlisted) {
      await removeProductFromWishlist(productId);
    } else {
      await addProductToWishlist(productId);
    }

    toggleStoreWishlistItem(productId);
  };

  return (
    <>
      <button
        type="button"
        className={clsx(
          "p-1 rounded-full transition-all duration-300 cursor-pointer bg-black/20 text-gray-100 hover:text-white hover:bg-black/30",
          {
            "text-text-primary bg-white hover:bg-white hover:text-text-primary":
              isWishlisted,
          }
        )}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        onClick={handleClick}
      >
        <MdOutlineFavoriteBorder size={20} />
      </button>
    </>
  );
};
