export const revalidate = 0;

import { H1, Title } from "@/components";
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

export default async function UserOrdersPage() {
  const { ok, orders } = await getOrdersBySessionUser();

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="Orders" />
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      /> */}
      <div className="ppbb-orders-page text-left w-full py-6 md:py-12  flex flex-col gap-16 ">
        <div className="container">
          <table className="min-w-full">
            <thead className="bg-white border-b border-b-gray-300">
              <tr>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Order #
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.length > 0
                ? orders.map((order) => (
                    <tr
                      key={order.id}
                      className="bg-white border-b border-b-gray-300 transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base font-medium text-text-primary">
                        {order.id.split("-").at(-1)}
                      </td>
                      <td className="text-sm md:text-base  text-text-primary  px-6 py-4 whitespace-nowrap">
                        {order.OrderAddress?.firstName}{" "}
                        {order.OrderAddress?.lastName}
                      </td>
                      <td className="flex items-center text-sm md:text-base text-text-primary  px-6 py-4 whitespace-nowrap">
                        <IoCardOutline
                          className={clsx({
                            "text-green-800":
                              order.status === "paid" ||
                              order.status === "shipped" ||
                              order.status === "delivered",
                            "text-red-800": order.status === "pending",
                          })}
                        />
                        <span
                          className={clsx("capitalize", {
                            "mx-2 text-green-800":
                              order.status === "paid" ||
                              order.status === "shipped" ||
                              order.status === "delivered",
                            "mx-2 text-red-800": order.status === "pending",
                          })}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="text-sm md:text-base text-text-primary  px-6 ">
                        <Link
                          href={`/orders/${order.id}`}
                          className="hover:underline"
                        >
                          View Order
                        </Link>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
