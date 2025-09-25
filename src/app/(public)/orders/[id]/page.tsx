import { OrderStatus, PayPalButton, ProductImage, Title } from "@/components";
import Link from "next/link";
import { getOrderById } from "@/actions";
import { redirect } from "next/navigation";
import { currencyFormat, toCents } from "@/utils";
import Image from "next/image";
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
  params: Promise<{ id: string }>;
}

export default async function OrderPage({ params }: Props) {
  const { id } = await params;

  // server action
  const { ok, order } = await getOrderById(id);
  if (!ok) {
    redirect("/");
  }

  // console.log(order);

  const address = order?.OrderAddress;
  const giftMessage = order?.giftMessage;

  // TODO: verify

  // const schema = {
  //   "@context": "https://schema.org",
  //   "@type": "ShoppingCart",
  //   name: "Your Shopping Cart",
  //   description:
  //     "View the items in your Purple Butterfly cart before completing your purchase.",
  //   url: "https://www.purplebutterflybouquets.com/cart",
  // };

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Title title={`Order #${id.split("-").at(-1)}`} />
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
                List of items
              </h2>
              <span className="fond-body text-primary font-semibold text-base">
                Order #{id.split("-").at(-1)}
              </span>
            </div>

            <OrderStatus status={order!.status} />

            {order!.OrderItems && (
              <div className="w-full flex flex-col divide-y divide-gray-200 border-b border-gray-300">
                {order!.OrderItems.map((item) => (
                  <div
                    key={item.product.slug + "-" + item.size}
                    className="flex flex-col md:flex-row w-full items-start md:items-center justify-between gap-2 md:gap-8 py-2 md:py-4"
                  >
                    <div className="flex items-center gap-3 md:gap-8">
                      <Link
                        href={`/product/${item.product.slug}`}
                        title={item.product.title}
                        className="hover:cursor-pointer"
                      >
                        <div className="h-24 w-24 relative bg-gray-100 flex items-center justify-center">
                          <ProductImage
                            src={item.product.images[0].url}
                            alt={item.product.title}
                            width={72}
                            height={72}
                            className="object-cover rounded-md overflow-hidden"
                          />
                        </div>
                      </Link>
                      <div className="flex items-center gap-2 justify-between">
                        <div className="flex flex-col justify-between">
                          <div className="flex flex-col items-start justify-start">
                            <h5 className="font-semibold text-base md:text-lg">
                              <Link
                                href={`/product/${item.product.slug}`}
                                title={item.product.title}
                              >
                                {item.product.title}{" "}
                                <span>{`- size ${item.size}`}</span>
                              </Link>
                            </h5>

                            <span className="font-semibold text-lg">{`${currencyFormat(
                              toCents(Number(item.unitPrice))
                            )} x ${item.quantity}`}</span>

                            <span className="font-semibold text-lg flex items-center gap-2">
                              <span>Subtotal: </span>
                              <span>{`${currencyFormat(
                                toCents(Number(item.unitPrice) * item.quantity)
                              )}`}</span>
                            </span>

                            {/* <div className="flex flex-col gap-1">
                              <div className="flex items-start gap-2">
                                {discountPercentage && (
                                  <span className="text-2xl font-regular text-body text-primary">
                                    -{discountPercentage}
                                  </span>
                                )}
                                <span className="text-2xl font-bold text-body">
                                  {unitPrice}
                                </span>
                              </div>
                              {discountPercentage && (
                                <span className="text-sm text-text-secondary font-regular text-body ">
                                  Base price:{" "}
                                  <span className="line-through">{basePrice}</span>
                                </span>
                              )}
                            </div> */}

                            {/* {item.size && (
                              <div className="flex items-center gap-2">
                                Selected size:
                                <span className="text-text-primary">
                                  {item.size}{" "}
                                  {item.extraPrice
                                    ? "(+" +
                                      currencyFormat(
                                        toCents(Number(item.extraPrice))
                                      ) +
                                      ") included"
                                    : ""}
                                </span>
                              </div>
                            )} */}

                            {/* {item.options && (
                              <div className="flex items-center gap-2">
                                Selected options:
                                <span className="text-text-primary">
                                  {options
                                    .map((option) => `${option.name}: ${option.extraPrice}`)
                                    .join(", ")}
                                </span>
                              </div>
                            )} */}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1"></div>

                    {/* <div className="w-full max-w-sm md:w-auto flex flex-row-reverse md:flex-col items-end">
                      <span className="font-semibold text-lg">{total}</span>
                      <QuantitySelector
                        quantity={product.quantity}
                        onQuantityChanged={(quantity) =>
                          updateCartItem(product.lineId, quantity)
                        }
                      />
                    </div> */}
                  </div>
                ))}
              </div>
            )}

            {giftMessage && (
              <div className="flex flex-col gap-5 py-5">
                <h3 className="font-bold text-sm">Gift Message</h3>
                <div className="w-full flex flex-col gap-3 p-4 bg-yellow-pastel rounded-lg">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 lg:gap-3">
                    <span className="font-bold text-text-primary col-span-1">
                      From:
                    </span>
                    <p className="col-span-1 lg:col-span-11">
                      {giftMessage.sender}
                    </p>

                    <span className="font-bold text-text-primary col-span-1">
                      To:
                    </span>
                    <p className="col-span-1 lg:col-span-11">
                      {giftMessage.recipient}
                    </p>

                    <span className="font-bold text-text-primary col-span-1">
                      Message:
                    </span>
                    <p className="col-span-1 lg:col-span-11">
                      {giftMessage.message}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* <div className="flex items-center justify-start gap-4 pt-4">
              <Link href="/cart" className="btn-secondary">
                Edit Cart
              </Link>
            </div> */}
          </div>

          <div className="flex flex-col gap-5 col-span-1 xl:col-span-3">
            {/* shipping address confirmation */}
            <div className="bg-white p-8 flex flex-col rounded-sm text-sm shadow-2xl">
              <div className="flex flex-col gap-5">
                <h3 className="font-bold">Shipping Address</h3>
                <div className="flex flex-col">
                  <p>
                    {address!.firstName} {address!.lastName}
                  </p>
                  <p>
                    {address!.address} {address?.address2 ?? ""}
                  </p>
                  <p>
                    {address!.city}, {address!.postalCode}
                  </p>
                  <p>{address!.countryId}</p>
                  <p>Phone: {address!.phone}</p>
                </div>
              </div>
            </div>

            {/* checkout summary */}
            <div className="bg-white p-8 flex flex-col rounded-sm text-sm shadow-2xl">
              <div className="flex flex-col gap-5">
                <h3 className="font-bold">Order Summary</h3>
                <div className="flex flex-col">
                  <span className="flex items-center justify-between gap-2 py-2">
                    Products: <span>{order!.totalItems}</span>
                  </span>
                  <span className="flex items-center justify-between gap-2 py-2">
                    Subtotal:{" "}
                    <span>
                      {currencyFormat(toCents(Number(order!.subTotal)))}
                    </span>
                  </span>
                  <span className="flex items-center justify-between gap-2 py-2">
                    Shipping and handling:{" "}
                    <span>
                      {currencyFormat(toCents(Number(order!.shipping)))}
                    </span>
                  </span>
                  <span></span>
                  <span className="flex items-center justify-between gap-2 py-2">
                    Tax:{" "}
                    <span>{currencyFormat(toCents(Number(order!.tax)))}</span>
                  </span>
                </div>
                <span className="flex items-center justify-between gap-2 pt-4 border-t border-t-gray-200 font-bold">
                  Total to pay:{" "}
                  <span className="text-lg">
                    {currencyFormat(toCents(Number(order!.totalAmount)))}
                  </span>
                </span>

                {order!.status !== "pending" ? (
                  <OrderStatus status={order!.status} />
                ) : (
                  <PayPalButton
                    orderId={order!.id}
                    amount={+order!.totalAmount}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {/* { JSON.stringify( products ) } */}
      </div>
    </>
  );
}
