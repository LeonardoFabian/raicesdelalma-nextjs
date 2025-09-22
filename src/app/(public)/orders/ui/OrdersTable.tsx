import { IOrder } from "@/interfaces";
import clsx from "clsx";
import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";

interface Props {
  orders: IOrder[];
}

export const OrdersTable = ({ orders }: Props) => {
  return (
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
                  {order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
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
  );
};
