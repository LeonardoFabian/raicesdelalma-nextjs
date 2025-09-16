import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

interface Props {
  status: string;
}

export const OrderStatus = ({ status }: Props) => {
  return (
    <div
      className={clsx(
        "w-full flex items-center rounded-lg py-2 px-3.5 text-xs font-bold  my-5",
        {
          "bg-red-100 text-red-500":
            status === "pending" || status === "canceled",
          "bg-green-100 text-green-700":
            status === "paid" ||
            status === "processing" ||
            status === "shipped" ||
            status === "delivered",
        }
      )}
    >
      <IoCardOutline size={30} />
      {/* <span className="mx-2">Payment pending</span> */}
      <span className="mx-2">This order is {status}</span>
    </div>
  );
};
