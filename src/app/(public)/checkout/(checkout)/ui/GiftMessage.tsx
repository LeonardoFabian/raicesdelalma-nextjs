"use client";

import { Loading } from "@/components";
import { useGiftMessageStore } from "@/store";
import { useEffect, useState } from "react";

export const GiftMessage = () => {
  const [loaded, setLoaded] = useState(false);

  const giftMessage = useGiftMessageStore((state) => state.message);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <Loading />;
  }

  return (
    <div className="w-full flex flex-col gap-3 p-4 bg-yellow-pastel rounded-lg">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 lg:gap-3">
        <span className="font-bold text-text-primary col-span-1">From:</span>
        <p className="col-span-1 lg:col-span-11">{giftMessage.sender}</p>

        <span className="font-bold text-text-primary col-span-1">To:</span>
        <p className="col-span-1 lg:col-span-11">{giftMessage.recipient}</p>

        <span className="font-bold text-text-primary col-span-1">Message:</span>
        <p className="col-span-1 lg:col-span-11">{giftMessage.message}</p>
      </div>
    </div>
  );
};
