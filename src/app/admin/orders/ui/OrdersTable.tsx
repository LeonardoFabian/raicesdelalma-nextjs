"use client";

import { changeOrderStatus } from "@/actions";
import type { IOrder } from "@/interfaces";
import clsx from "clsx";
import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";

interface Props {
  orders: IOrder[];
}

export const OrdersTable = ({ orders }: Props) => {
  return (
    <table className="min-w-full overflow-x-scroll">
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
            Manage Status
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-right"
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
                  {order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
                </td>
                <td className="flex items-center text-sm md:text-base text-text-primary  px-6 py-4 whitespace-nowrap">
                  <IoCardOutline
                    className={clsx({
                      "text-green-800":
                        order.status === "paid" ||
                        order.status === "processing" ||
                        order.status === "shipped" ||
                        order.status === "delivered",
                      "text-red-800":
                        order.status === "pending" ||
                        order.status === "canceled",
                    })}
                  />
                  <span
                    className={clsx("capitalize mx-2", {
                      " text-green-800":
                        order.status === "paid" ||
                        order.status === "processing" ||
                        order.status === "shipped" ||
                        order.status === "delivered",
                      " text-red-800":
                        order.status === "pending" ||
                        order.status === "canceled",
                    })}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="text-sm md:text-base text-text-primary  px-6 ">
                  <select
                    className="text-sm text-text-primary cursor-pointer"
                    value={order.status}
                    onChange={(e) =>
                      changeOrderStatus(order.id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </td>
                <td className="text-sm md:text-base text-text-primary px-6 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/orders/${order.id}`}
                      className="text-link font-semibold hover:underline"
                    >
                      View Order
                    </Link>
                    {order.giftMessage && (
                      <Link
                        href="#"
                        className="text-link font-semibold hover:underline"
                      >
                        Message QR
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
};
