"use client";

import clsx from "clsx";
import type { ISize } from "@/interfaces";
import { IProductSize } from "@/interfaces/size.interface";
import { useMemo, useState } from "react";

interface Props {
  selectedSize?: IProductSize;
  availableSizes?: IProductSize[];
  onSelectSize: (size: IProductSize) => void;
}

export const SizeSelector = ({
  selectedSize,
  availableSizes,
  onSelectSize,
}: Props) => {
  // console.log({ selectedSize, availableSizes });

  return (
    <div className="my-5 flex flex-col gap-4">
      <p>Selecciona un tamaño</p>
      <div className="flex items-center gap-4">
        {availableSizes?.map((size, index) => {
          // TODO: fix size.stock not exists in ISize
          const disabled = (size.sizeId ?? 0) <= 0;
          return (
            <button
              key={size.sizeId + "-" + index}
              type="button"
              onClick={() => !disabled && onSelectSize(size)}
              className={clsx(
                "text-2xl flex items-center justify-center flex-nowrap text-text-primary hover:text-primary cursor-pointer",
                {
                  "text-primary border-b border-b-primary hover:text-primary-hover":
                    size.sizeId === selectedSize?.sizeId,
                  "opacity-40 cursor-not-allowed": disabled,
                }
              )}
            >
              {size.size?.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
