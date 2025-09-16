"use client";

import { addToShoppingCartCookie } from "@/shopping-cart/actions/actions";
// import { Product } from "@prisma/client";
import { ISize, Product as ProductUI } from "@/interfaces";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useRouter } from "next/navigation";
import { fontBody } from "@/config/fonts";
import clsx from "clsx";

interface Props {
  product: ProductUI;
  quantity?: number;
  size?: ISize;
  disabled: boolean;
}

export const AddToCart = ({ product, quantity = 1, size, disabled }: Props) => {
  // console.log({ product, quantity, size, disabled });

  const router = useRouter();

  const onAddToCart = () => {
    addToShoppingCartCookie(product.id, quantity);
    router.refresh();
  };

  return (
    <>
      <button
        type="button"
        onClick={onAddToCart}
        disabled={disabled}
        className={clsx(
          "btn-primary whitespace-nowrap !flex items-center flex-nowrap gap-2",
          {
            "opacity-40 cursor-not-allowed": disabled,
          }
        )}
      >
        <span className="inline-flex">
          <MdOutlineShoppingBag
            size={24}
            className="flex items-center justify-center"
          />
        </span>
        <span className={`${fontBody.className} inline-block`}>
          Add to Cart
        </span>
      </button>
    </>
  );
};
