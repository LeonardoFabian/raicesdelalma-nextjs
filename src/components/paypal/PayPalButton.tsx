"use client";

// https://www.npmjs.com/package/@paypal/react-paypal-js

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from "@paypal/paypal-js";
import { AnimatePulse } from "@/components";
import { paypalCheckPayment, setTransactionId } from "@/actions";

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = Math.round(amount * 100) / 100; // 123.12

  if (isPending) {
    return (
      <AnimatePulse>
        <div className="flex flex-col gap-2 items-center">
          <div className="flex h-10 w-full bg-gray-200 rounded"></div>
          <div className="flex h-10 w-full bg-gray-200 rounded"></div>
          <div className="flex h-3 w-44 bg-gray-200 rounded"></div>
        </div>
      </AnimatePulse>
    );
  }

  /**
   * Creates an order via the PayPal API
   * @param data
   * @param actions
   * @returns The transaction ID of the created order
   * @throws If there is an issue setting the transaction ID in the database
   */
  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ) => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          invoice_id: orderId, // TODO: in development, comment this for test multiple PayPal orders for the same order,
          amount: {
            value: `${roundedAmount}`,
            currency_code: "USD",
          },
        },
      ],
      intent: "CAPTURE",
    });

    // console.log({ transactionId });

    // save the transaction id in the database
    const { ok } = await setTransactionId(orderId, transactionId);

    if (!ok) {
      throw new Error("Something went wrong setting transaction id");
    }

    return transactionId;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    // console.log("onApprove");
    const details = await actions.order?.capture();
    if (!details) return;

    await paypalCheckPayment(details?.id);
  };

  return (
    <div className="relative z-0">
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </div>
  );
};
