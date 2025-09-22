import { H1, Title } from "@/components";
import { Product as ProductUI } from "@/interfaces";
import { CartItem } from "@/shopping-cart";
import { Product } from "@prisma/client";
import { Metadata } from "next";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { OrderSummary } from "../../cart/ui/OrderSummary";
import { ProductsInCart } from "./ui/ProductsInCart";
import { PlaceOrder } from "./ui/PlaceOrder";
import Head from "next/head";

// export const metadata: Metadata = {
//   title: "Your Shopping Cart | Purple Butterfly",
//   description:
//     "Review your soulful gifts before checkout. Coffee bouquets, teas, and flowers — all wrapped with meaning.",
//   openGraph: {
//     title: "Shopping Cart | Purple Butterfly",
//     description:
//       "View the personalized gifts in your cart — one step away from brightening someone’s soul.",
//     url: "https://www.purplebutterflybouquets.com/cart",
//     type: "website",
//   },
//   twitter: {
//     title: "Shopping Cart | Purple Butterfly",
//     description:
//       "Check what's in your cart and get ready to send joy, love, and coffee in every bouquet.",
//     card: "summary_large_image",
//   },
// };

export default async function CheckoutPage() {
  // const schema = {
  //   "@context": "https://schema.org",
  //   "@type": "ShoppingCart",
  //   name: "Your Shopping Cart",
  //   description:
  //     "View the items in your Purple Butterfly cart before completing your purchase.",
  //   url: "https://www.purplebutterflybouquets.com/cart",
  // };

  interface CartItem {
    product: Product;
    quantity: number;
  }

  const getCartItems = async (cart: {
    [id: string]: number;
  }): Promise<CartItem[]> => {
    let cartItems: CartItem[] = [];

    for (const id of Object.keys(cart)) {
      const product = await prisma.product.findFirst({ where: { id } });
      if (product) {
        cartItems.push({ product, quantity: cart[id] });
      }
    }

    return cartItems;
  };

  const cookieStore = await cookies();
  const cart = JSON.parse(
    (cookieStore.get("ppbbCart")?.value as string) ?? "{}"
  ) as { [id: string]: number };
  // console.log({ cart });

  const productsInCart = await getCartItems(cart);

  // console.log({ productsInCart });

  const subtotal = productsInCart.reduce(
    (prev, current) => +current.product.price * current.quantity + prev,
    0
  );

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Title title="Checkout" />
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      /> */}
      {/* { JSON.stringify( products ) } */}
      <div className="ppbb-cart-page text-left w-full py-6 md:py-12 flex flex-col gap-16">
        <div className="container cart-grid">
          <div className="bg-white shadow-2xl p-4 md:p-8 col-span-1 md:col-span-4 xl:col-span-9 flex flex-col  items-start justify-start rounded-sm">
            <div className="flex items-center justify-between w-full gap-8 pb-4 border-b border-b-gray-200">
              <h2 className="fond-body text-text-primary text-2xl font-semibold">
                Cart items
              </h2>
              <span className="fond-body text-text-secondary text-base">
                Subtotal
              </span>
            </div>

            <ProductsInCart />

            <div className="w-full flex items-center justify-center gap-4 pt-4">
              <Link href="/cart" className="btn-secondary">
                Edit Cart
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-5 col-span-1 xl:col-span-3">
            <PlaceOrder />
          </div>
        </div>
        {/* { JSON.stringify( products ) } */}
      </div>
    </>
  );
}
