import { Title } from "@/components";
import { AddressForm } from "./ui/AddressForm";
import { OrderSummary } from "../../cart/ui/OrderSummary";
import { getCountries, getUserAddress } from "@/actions";
import { auth } from "@/auth.config";

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

export default async function ShippingAddressPage() {
  // const schema = {
  //   "@context": "https://schema.org",
  //   "@type": "ShoppingCart",
  //   name: "Your Shopping Cart",
  //   description:
  //     "View the items in your Purple Butterfly cart before completing your purchase.",
  //   url: "https://www.purplebutterflybouquets.com/cart",
  // };

  const countries = await getCountries();
  const session = await auth();

  if (!session?.user || !session.user.id) {
    return console.log("No user session found");
  }
  const userAddress = (await getUserAddress(session.user.id)) ?? undefined;
  // console.log({ userAddress });

  return (
    <>
      <Title title="Shipping Address" />
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      /> */}
      {/* { JSON.stringify( products ) } */}
      <div className="ppbb-cart-page text-left w-full py-6 md:py-12 flex flex-col gap-16">
        <div className="container cart-grid">
          <div className="bg-white shadow-2xl p-4 md:p-8 col-span-1 md:col-span-4 xl:col-span-9 flex flex-col  items-start justify-start rounded-sm">
            <div className="flex items-center justify-between w-full gap-8 pb-4 border-b border-b-gray-200">
              <h2 className="fond-body text-text-primary text-2xl font-semibold">
                Address
              </h2>
              {/* <span className="fond-body text-text-secondary text-base">
                Price
              </span> */}
            </div>

            <AddressForm countries={countries} userAddress={userAddress} />
          </div>

          <div className="flex flex-col col-span-1 xl:col-span-3">
            <div className="bg-white p-8 flex flex-col rounded-sm text-sm shadow-2xl">
              <div className="flex flex-col gap-8">
                <OrderSummary />
              </div>
            </div>
          </div>
        </div>
        {/* { JSON.stringify( products ) } */}
      </div>
    </>
  );
}
