"use client";

import { useEffect, useState } from "react";
import { OrderSummary } from "@/app/(public)/cart/ui/OrderSummary";
import { useAddressStore, useCartStore } from "@/store";
import { Loading } from "@/components";
import { currencyFormat, sleep, toCents } from "@/utils";
import Link from "next/link";
import clsx from "clsx";
import { CartOption } from "@/lib/pricing";
import { placeOrder } from "@/actions";
import { useRouter } from "next/navigation";

export const PlaceOrder = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const address = useAddressStore((state) => state.address);
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clear);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    await sleep(2);

    const productsToOrder = cart.map((product) => ({
      productId: product.productId,
      quantity: product.quantity,
      size: product.selectedSize,
      options: Array.isArray(product.options) ? product.options : [],
      // options: options.map((o) => ({ name: o.name, extraPrice: toCents(o.extraPriceCents) })),
      // options: options,
    }));

    // console.log({ address, productsToOrder });
    // server action: placeOrder
    const resp = await placeOrder(productsToOrder, address);
    // console.log({ resp });

    if (!resp.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(resp.message);
      return;
    }

    // 🧠 Send event to Google Tag Manager
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "purchase",
      ecommerce: {
        transaction_id: resp.order!.id,
        value: resp.order!.totalAmount, // total en USD
        currency: "USD",
        items: cart.map((product) => ({
          item_id: product.productId,
          item_name: product.title,
          quantity: product.quantity,
          price: currencyFormat(product.basePriceCents), // asegúrate de tenerlo en el objeto
          discount: currencyFormat(product.discountCents ?? 0),
          item_variant: product.selectedSize?.label,
        })),
      },
    });

    // all ok?
    clearCart();

    router.replace("/orders/" + resp.order!.id);
  };

  if (!loaded) {
    return <Loading />;
  }

  return (
    <>
      {/* shipping address confirmation */}
      <div className="bg-white p-8 flex flex-col rounded-sm text-sm shadow-2xl">
        <div className="flex flex-col gap-5">
          <h3 className="font-bold">Shipping Address</h3>
          <div className="flex flex-col">
            <p>{`${address.firstName} ${address.lastName}`}</p>
            <p>{`${address.address} ${address.address2 ?? ""},`}</p>
            <p>{`${address.city}, ${address.country}`}</p>
            <p>{address.postalCode}</p>
            <p>Phone: {address.phone}</p>
          </div>
        </div>
      </div>

      {/* checkout summary */}
      <div className="bg-white p-8 flex flex-col rounded-sm text-sm shadow-2xl">
        <div className="flex flex-col gap-5">
          <h3 className="font-bold">Summary</h3>
          <OrderSummary />

          <p className="text-sm">
            By clicking "Place Order", you agree to our{" "}
            <Link
              href={"/legal/terms-and-conditions"}
              className="underline hover:text-primary-hover"
            >
              Terms and Conditions
            </Link>{" "}
            and our{" "}
            <Link
              href={"/legal/privacy-policy"}
              className="underline hover:text-primary-hover"
            >
              Privacy Policy
            </Link>
            .
          </p>

          <div className="flex flex-col gap-2">
            {errorMessage && (
              <span className="fade-in alert-danger">{errorMessage}</span>
            )}
            <button
              // href="/orders/123"
              onClick={onPlaceOrder}
              className={clsx({
                "btn-primary text-center": !isPlacingOrder,
                "btn-disabled text-center": isPlacingOrder,
              })}
              disabled={isPlacingOrder}
            >
              {isPlacingOrder ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
