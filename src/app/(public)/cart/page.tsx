import { PageHeader } from "@/src/components";
import { Product, ProductGrid, ProductsResponse } from "@/src/products";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Your Shopping Cart | Purple Butterfly",
  description: "Review your soulful gifts before checkout. Coffee bouquets, teas, and flowers — all wrapped with meaning.",
  openGraph: {
    title: "Shopping Cart | Purple Butterfly",
    description: "View the personalized gifts in your cart — one step away from brightening someone’s soul.",
    url: "https://www.purplebutterflybouquets.com/cart",
    type: "website",
  },
  twitter: {
    title: "Shopping Cart | Purple Butterfly",
    description: "Check what's in your cart and get ready to send joy, love, and coffee in every bouquet.",
    card: "summary_large_image",
  },
};


export default async function CartPage() {

    const schema = {
    "@context": "https://schema.org",
    "@type": "ShoppingCart",
    "name": "Your Shopping Cart",
    "description": "View the items in your Purple Butterfly cart before completing your purchase.",
    "url": "https://www.purplebutterflybouquets.com/cart"
  };

    return (
        <>
            <PageHeader title="Shopping Cart" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            {/* { JSON.stringify( products ) } */}
            <div className="flex flex-col">

                <span>List of Products</span>

                <ProductGrid products={ [] } />

            </div>
        </>
    )
}