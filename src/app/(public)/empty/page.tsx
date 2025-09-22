import { Title } from "@/components";
import { Product } from "@prisma/client";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { IoCartOutline } from "react-icons/io5";
import Link from "next/link";
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

export default async function EmptyPage() {
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
      <Title title="Empty Cart" />
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      /> */}
      <div className="ppbb-empty-page w-full py-6  px-4 md:px-12 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center h-[60vh] gap-5">
          <IoCartOutline className="text-6xl text-gray-300" />

          <div className="flex flex-col col-span-1 ">
            <h1 className="text-4xl font-bold">Your Cart is Empty</h1>
          </div>

          <p className="text-gray-500 text-2xl">
            Add items to your cart to see them here.
          </p>
          <Link href="/shop" className="text-primary font-semibold text-xl">
            Continue Shopping
          </Link>
        </div>
      </div>
    </>
  );
}
