"use client";

import clsx from "clsx";
import { fontBody } from "@/config/fonts";
import { getAccessoryById, getStockBySize } from "@/actions";
import { useEffect, useState } from "react";

interface Props {
  productId: string;
  sizeId: number;
}

export const StockLabel = async ({ productId, sizeId }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStock();
  }, [stock]);

  const getStock = async () => {
    const inStock = await getStockBySize(productId, sizeId);
    // console.log({ inStock });
    setStock(+inStock);
  };

  return (
    <span
      className={clsx(
        `${fontBody.className} text-xs antialiased font-semibold`,
        {
          "text-gray-500": stock < 5,
          "text-gray-800": stock >= 5,
        }
      )}
    >
      Stock: {stock}
    </span>
  );
};
