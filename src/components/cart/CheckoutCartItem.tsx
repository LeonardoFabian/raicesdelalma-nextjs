"use client";

import Image from "next/image";
import { Product } from "@prisma/client";
import { ICartItem } from "@/interfaces";
import { useRouter } from "next/navigation";
import {
  addToShoppingCartCookie,
  removeSingleItemFromCartCookie,
} from "@/shopping-cart/actions/actions";
import { MdAdd, MdOutlineRemove } from "react-icons/md";
import { QuantitySelector } from "../product/QuantitySelector";
import Link from "next/link";
import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import { Loading } from "../layout/loading/Loading";
import { ProductImage } from "../product/product-image/ProductImage";

interface Props {
  product: ICartItem;
}

export const CheckoutCartItem = ({ product }: Props) => {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const updateCartItem = useCartStore((state) => state.updateCartItem);
  const removeLine = useCartStore((state) => state.removeLine);
  const itemLineSummary = useCartStore((state) => state.getCartItemLineSummary);
  const {
    total,
    options,
    selectedSize,
    basePrice,
    basePriceWithDiscount,
    discountPercentage,
    unitPrice,
  } = itemLineSummary(product);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <Loading />;

  // const onRemoveItem = () => {
  //   removeSingleItemFromCartCookie(product.id);
  //   router.refresh();
  // };

  // const onAddToCart = () => {
  //   addToShoppingCartCookie(product.id);
  //   router.refresh();
  // };

  return (
    <div className="flex flex-col md:flex-row w-full items-start md:items-center justify-between gap-2 md:gap-8 py-2 md:py-4">
      <div className="flex items-center gap-3 md:gap-8">
        <div className="h-24 w-24 relative bg-gray-100 flex items-center justify-center">
          <ProductImage
            src={product.image.url}
            alt={product.title}
            width={72}
            height={72}
            className="object-cover rounded-md overflow-hidden"
          />
        </div>

        <div className="flex items-center gap-2 justify-between">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col items-start justify-start">
              <h5 className="font-semibold text-base md:text-lg">
                <span>{`${product.quantity} ${product.title}`}</span>
                <span>{`- ${product?.selectedSize?.label}`}</span>
              </h5>
              <span className="font-semibold text-lg">{`${unitPrice} x ${product.quantity}`}</span>
              <div className="flex items-center gap-2">
                Selected options:
                <span className="text-text-primary">
                  {options
                    .map((option) => `${option.name}: ${option.extraPrice}`)
                    .join(", ")}
                </span>
              </div>
            </div>
            <div className="flex-1"></div>
          </div>
        </div>
      </div>

      <div className="flex-1"></div>
      <div className="w-full max-w-sm md:w-auto flex flex-row-reverse md:flex-col items-end">
        <span className="font-semibold text-lg">{total}</span>
      </div>
    </div>
  );
};
