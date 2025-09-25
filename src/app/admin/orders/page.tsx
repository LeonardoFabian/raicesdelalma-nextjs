export const revalidate = 0;

import { PageTitle, Title } from "@/components";
import { Product as ProductUI } from "@/interfaces";
import { CartItem } from "@/shopping-cart";
import { Product } from "@prisma/client";
import { Metadata } from "next";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { IoCardOutline } from "react-icons/io5";
import Link from "next/link";
import { getOrders, getOrdersBySessionUser } from "@/actions";
import { redirect } from "next/navigation";
import clsx from "clsx";
import { Pagination } from "@/components";
import { OrdersTable } from "./ui/OrdersTable";
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

export default async function AdminOrdersPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const pageParam = page ? parseInt(page) : 1;

  const { ok, orders, totalPages, currentPage, count } = await getOrders({
    page: pageParam,
  });

  if (!ok) {
    redirect("/auth/login");
  }

  if (orders && orders.length === 0) {
    redirect("/admin/orders");
  }

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="pbb-admin-orders-page flex flex-col gap-4 w-full px-4 md:px-6">
        <PageTitle title="Orders" subtitle="Manage orders and order status" />

        <div className="container flex flex-col gap-4">
          {orders && orders.length > 0 && (
            <div className="w-full overflow-x-auto">
              <OrdersTable orders={orders} />
            </div>
          )}

          {orders && orders.length > 0 && (
            <div className="flex items-center justify-center">
              <Pagination totalPages={totalPages} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
