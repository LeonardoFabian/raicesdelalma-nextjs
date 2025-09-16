"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { StoreProviders } from "@/store/Providers";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "",
        intent: "capture",
        currency: "USD",
      }}
    >
      <SessionProvider>
        <StoreProviders>{children}</StoreProviders>
      </SessionProvider>
    </PayPalScriptProvider>
  );
}
