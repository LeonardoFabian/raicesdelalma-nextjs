import { auth } from "@/auth.config";
import { Title } from "@/components";
import Head from "next/head";
import { GiftMessageForm } from "./ui/GiftMessageForm";
import { OrderSummary } from "@/app/(public)/cart/ui/OrderSummary";

export default async function GiftMessagePage() {
  const session = await auth();

  if (!session?.user || !session?.user?.id) {
    return console.log("No user session found");
  }

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Title title="Gift Message" />

      <div className="ppbb-cart-page text-left w-full py-6 md:py-12 flex flex-col gap-16">
        <div className="container cart-grid">
          <div className="bg-white shadow-2xl p-4 md:p-8 col-span-1 md:col-span-4 xl:col-span-9 flex flex-col  items-start justify-start rounded-sm">
            <div className="flex items-center justify-between w-full gap-8 pb-4 border-b border-b-gray-200">
              <h2 className="fond-body text-text-primary text-2xl font-semibold">
                Add your Gift Message
              </h2>
              {/* <span className="fond-body text-text-secondary text-base">
                        Price
                      </span> */}
            </div>

            <GiftMessageForm />
          </div>

          <div className="flex flex-col col-span-1 xl:col-span-3">
            <div className="bg-white p-8 flex flex-col rounded-sm text-sm shadow-2xl">
              <div className="flex flex-col gap-8">
                <OrderSummary />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
