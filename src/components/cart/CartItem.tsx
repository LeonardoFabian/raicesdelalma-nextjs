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
import { currencyFormat, toCents } from "@/utils";
import { ProductImage } from "@/components";

interface Props {
  product: ICartItem;
}

export const CartItem = ({ product }: Props) => {
  // console.log("CartItem product", product);

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
        <Link
          href={`/product/${product.slug}`}
          title={product.title}
          className="hover:cursor-pointer"
        >
          <div className="h-24 w-24 relative bg-gray-100 flex items-center justify-center">
            <ProductImage
              src={product.image.url}
              alt={product.title}
              width={72}
              height={72}
              className="object-cover rounded-md overflow-hidden"
            />
          </div>
        </Link>
        <div className="flex items-center gap-2 justify-between">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col items-start justify-start">
              <h5 className="font-semibold text-base md:text-lg">
                <Link href={`/product/${product.slug}`} title={product.title}>
                  {product.title}{" "}
                  <span>{`- size ${product?.selectedSize?.label}`}</span>
                </Link>
              </h5>

              <div className="flex flex-col gap-1">
                <div className="flex items-start gap-2">
                  {discountPercentage && (
                    <span className="text-2xl font-regular text-body text-primary">
                      -{discountPercentage}
                    </span>
                  )}
                  <span className="text-2xl font-bold text-body">
                    {unitPrice}
                  </span>
                </div>
                {discountPercentage && (
                  <span className="text-sm text-text-secondary font-regular text-body ">
                    Base price:{" "}
                    <span className="line-through">{basePrice}</span>
                  </span>
                )}
              </div>

              {selectedSize && (
                <div className="flex items-center gap-2">
                  Selected size:
                  <span className="text-text-primary">
                    {selectedSize?.label}{" "}
                    {selectedSize.extraPriceCents
                      ? "(+" +
                        currencyFormat(selectedSize?.extraPriceCents) +
                        ")"
                      : ""}
                  </span>
                </div>
              )}

              {options.length > 0 && (
                <div className="flex items-center gap-2">
                  Selected options:
                  <span className="text-text-primary">
                    {options
                      .map((option) => `${option.name}: ${option.extraPrice}`)
                      .join(", ")}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1"></div>
            <div className="flex items-center gap-3 mt-auto">
              <button
                className="text-red-500 hover:underline cursor-pointer"
                onClick={() => removeLine(product.lineId)}
              >
                Remove from Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1"></div>

      <div className="w-full max-w-sm md:w-auto flex flex-row-reverse md:flex-col items-end">
        <span className="font-semibold text-lg">{total}</span>
        <QuantitySelector
          quantity={product.quantity}
          onQuantityChanged={(quantity) =>
            updateCartItem(product.lineId, quantity)
          }
        />
      </div>
    </div>
  );
};
