"use client";

import { Loading } from "@/components";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store";

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);
  const totalCartItems = useCartStore((state) => state.getTotalItems());
  const getSummaryInformation = useCartStore((state) => state.getCartSummary);
  const { subtotal, shipping, tax, total } = getSummaryInformation();

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <Loading />;

  return (
    <>
      {totalCartItems && totalCartItems > 0 && (
        <>
          <div className="flex flex-col">
            <span className="flex items-center justify-between gap-2 py-2">
              Products: <span>{`${totalCartItems}`}</span>
            </span>
            <span className="flex items-center justify-between gap-2 py-2">
              Subtotal: <span>{subtotal}</span>
            </span>
            <span className="flex items-center justify-between gap-2 py-2">
              Shipping and handling: <span>{shipping}</span>
            </span>
            <span className="flex items-center justify-between gap-2 py-2">
              Tax: <span>{tax}</span>
            </span>
          </div>

          <span className="flex items-center justify-between gap-2 pt-4 border-t border-t-gray-200 font-bold">
            Total to pay: <span className="text-lg">{total}</span>
          </span>
        </>
      )}
    </>
  );
};
