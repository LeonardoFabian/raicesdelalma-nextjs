//  dynamic revalidate for page, layout or route handler
export const dynamic = "force-dynamic";
export const revalidate = 0;

// import { JSX } from "react";
import type { Metadata } from "next";
// import { cookies } from "next/headers";
// import { useRouter } from "next/navigation";
import prisma from "@/lib/prisma";
import { H1, Title, ProductGrid, Pagination } from "@/components";
// import { getProducts } from "@/products";
// import {
//   getProducts,
//   getProductsByCategory,
// } from "@/products/actions/product-actions";
import { CategoriesTabBar } from "@/categories";
// import * as productHelpers from "@/products/helpers/products";
import { getPaginatedProductsWithImages } from "@/actions";
import { Product as ProductUI } from "@/interfaces";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Shop Coffee Bouquets, Tea & Flowers | Purple Butterfly",
  description:
    "Explore our handcrafted coffee bouquets, tea gifts, and floral arrangements — perfect for every occasion. Delivered with heart from Purple Butterfly.",
  openGraph: {
    title: "Shop Coffee Bouquets, Tea & Flowers",
    description:
      "Unique gifts for every soul — shop coffee, tea, and floral arrangements made with love.",
    url: "https://www.raicesdelalma.com.do/shop",
    type: "website",
  },
  twitter: {
    title: "Explore Our Products | Purple Butterfly",
    description:
      "Browse our personalized coffee, tea, and flower gifts — made to sweeten the soul.",
    card: "summary_large_image",
  },
};

interface Props {
  searchParams: Promise<{ page?: string }>;
}

// export default function ShopPage() {
export default async function ShopPage({ searchParams }: Props) {
  // console.log({ searchParams });

  const { page } = await searchParams;
  const pageParam = page ? parseInt(page) : 1;

  const categories = await prisma.category.findMany({
    orderBy: { title: "asc" },
  });

  const { products, totalPages, currentPage, count } =
    await getPaginatedProductsWithImages({ page: pageParam });

  if (products.length === 0) {
    redirect("/shop");
  }

  // console.log(products);

  // TODO: add product schema

  // let itemListElement: [
  //   { [key: string]: string | number | boolean | undefined | object }
  // ] = [{}];
  // products.forEach((product) => {
  //   itemListElement.push({
  //     "@type": "Product",
  //     name: product.title,
  //     // image: product.images[0],
  //     description: product?.description,
  //     brand: "Purple Butterfly Bouquets",
  //     offers: {
  //       "@type": "Offer",
  //       priceCurrency: "USD",
  //       price: product.price,
  //       availability: "https://schema.org/InStock",
  //     },
  //   });
  // });

  // const schema = {
  //   "@context": "https://schema.org",
  //   "@type": "ItemList",
  //   itemListElement: itemListElement,
  // };

  return (
    <>
      <Title title="Productos" />
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      /> */}

      {/* <Script
              id="jsonld-products"
              type="application/ld+json"
              strategy="afterInteractive"
            >
              {JSON.stringify(schema)}
            </Script> */}

      <div className="rda-shop-products-page container text-left py-12 flex flex-col gap-16">
        <div className="flex flex-col gap-4 items-center justify-center">
          <H1>Categorías</H1>
          {categories && (
            <CategoriesTabBar categories={categories} currentCategoryId={"0"} />
          )}
        </div>
        {/* { JSON.stringify( products ) } */}

        <div className="flex flex-col gap-16">
          {products && <ProductGrid products={products} />}
          {products.length > 0 && <Pagination totalPages={totalPages} />}
        </div>
      </div>
    </>
  );
}
