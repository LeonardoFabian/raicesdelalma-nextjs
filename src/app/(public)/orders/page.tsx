export const dynamic = "force-dynamic";
export const revalidate = 0;

import { H1, Pagination, Title } from "@/components";
import { Product as ProductUI } from "@/interfaces";
import { CartItem } from "@/shopping-cart";
import { Product } from "@prisma/client";
import { Metadata } from "next";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { IoCardOutline } from "react-icons/io5";
import Link from "next/link";
import { getOrdersBySessionUser } from "@/actions";
import { redirect } from "next/navigation";
import clsx from "clsx";
import { OrdersTable } from "./ui/OrdersTable";
import { MdInfoOutline } from "react-icons/md";
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

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function UserOrdersPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const pageParam = page ? parseInt(page) : 1;

  const { ok, orders, totalPages, currentPage, count } =
    await getOrdersBySessionUser({ page: pageParam, take: 12 });

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Title title="Orders" />
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      /> */}
      <div className="ppbb-orders-page text-left w-full py-6 md:py-12  flex flex-col gap-16 ">
        <div className="container">
          {orders && orders.length > 0 ? (
            <OrdersTable orders={orders} />
          ) : (
            <span className="alert alert-default">
              <MdInfoOutline size={24} />

              <span className="flex flex-col gap-1">
                <strong>You haven't placed any orders yet!</strong>
                <span>
                  It looks like you haven't made any purchases yet. If you're
                  ready to buy something, browse our
                  <Link href="/shop">Shop</Link> and start adding items to your
                  cart. We're here to help you every step of the way!
                </span>
              </span>
            </span>
          )}

          {orders && orders.length > 0 && (
            <Pagination totalPages={totalPages} />
          )}
        </div>
      </div>
    </>
  );
}
