"use client";

import { Loading, CheckoutCartItem } from "@/components";
// import { CartItem } from "@/shopping-cart";
import { useCartStore } from "@/store";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  //   const subtotal = productsInCart.reduce(
  //   (prev, current) => +current.product.price * current.quantity + prev,
  //   0
  // );

  if (!loaded) {
    return <Loading />;
  }

  return (
    <>
      {productsInCart && (
        <div className="w-full flex flex-col divide-y divide-gray-200">
          {productsInCart.map((product, index) => (
            <CheckoutCartItem
              key={`${product.slug}-${product.selectedSize?.label}`}
              product={product}
            />
          ))}
        </div>
      )}
    </>
  );
};
