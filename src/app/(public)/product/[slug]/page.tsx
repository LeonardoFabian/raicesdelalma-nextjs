//  dynamic revalidate for page, layout or route handler
export const dynamic = "force-dynamic";
export const revalidate = 0; // 10080 = 7 days | 0
// export const revalidate = 604800; // 10080 = 7 days | 0

import {
  AddToWishlist,
  Rating,
  Star,
  QuantitySelector,
  ProductSlideshow,
  PageTitle,
} from "@/components";
import { Metadata } from "next";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { MdAddShoppingCart, MdOutlineShoppingBag } from "react-icons/md";
import { H1 } from "@/components";
// import { getProduct } from "@/products";
import { JSX } from "react";
import { notFound } from "next/navigation";
import { SizeSelector } from "@/components/product/size-selector/SizeSelector";
import { fontBody } from "@/config/fonts";
import { ProductMobileSlideshow } from "@/components/product/slideshow/ProductMobileSlideshow";
import {
  getCategoryById,
  getPaginatedProductsWithImages,
  getProductBySlug,
  getSettings,
} from "@/actions";
import { AddToCartOptions } from "./ui/AddToCartOptions";
import { calcDiscountCents, currencyFormat, toCents } from "@/utils";
import { RelatedProducts } from "./ui/RelatedProducts";
import { fontHeading } from "@/config/fonts";

interface Props {
  params: Promise<{ slug: string }>;
}

/**
 * This function is used to generate static parameters for the product page.
 * It fetches all available product ids and returns an object with the id as the key and the id as the value.
 * The function is called at build time and the result is used to generate static pages for each product.
 * @returns {Promise<Record<string, string | number>>} An object with the id as the key and the id as the value.
 */
export async function generateStaticParams() {
  const staticProducts = Array.from({ length: 24 }).map((_, i) => `${i + 1}`);

  return staticProducts.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const product = await getProductBySlug(slug);

    return {
      title: product?.title ?? "Product Not Found",
      description: product?.description ?? "Single product page",
      openGraph: {
        title: product?.title ?? "Product Not Found",
        description: product?.description ?? "Single product page",
        images: [{ url: product?.images[0].url ?? "" }],
        url: `https://www.raicesdelalma.com.do/product/${slug}`,
        type: "website",
      },
      twitter: {
        title: product?.title ?? "Product Not Found",
        description: product?.description ?? "Single product page",
        card: "summary_large_image",
        images: product?.images[0].url ?? "",
      },
    };
  } catch (error) {
    return {
      title: "Product page",
      description: "Single product page",
    };
  }
}

export default async function SingleProductPage({ params }: Props) {
  // console.log(params.slug);

  const { slug } = await params;

  const settings = await getSettings();

  // const product = await getProduct( params.slug );
  const product = await getProductBySlug(slug);

  // console.log({ product });

  if (!product) {
    return notFound();
  }

  // const availableSizes = product.productSizes;

  // console.log({ product });

  const category = await getCategoryById(product?.categoryId);

  const { products: relatedProducts } = await getPaginatedProductsWithImages({
    page: 1,
    take: 5,
    category: category,
  });

  return (
    <div className="product-page flex flex-col gap-12 py-0  md:py-12 px-0 md:px-8 lg:px-12 xl:px-28 mx-auto w-full">
      <div className="container-fluid grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-24">
        <div className="col-span-1 md:col-span-2 relative w-full">
          <ProductMobileSlideshow
            title={product.title}
            images={product.images}
            className="block md:hidden"
          />
          <ProductSlideshow
            title={product.title}
            images={product.images}
            className="hidden md:block"
          />
        </div>
        <div className="product-info px-5 pb-5 md:pb-0 md:px-0 col-span-1 flex flex-col gap-4">
          <h1
            className={`${fontHeading.className} font-heading text-xl md:text-4xl text-primary`}
          >
            {product.title}
          </h1>
          {product.rating && <Rating rating={+product.rating} />}

          <AddToCartOptions product={product} settings={settings} />

          <section id="product-details" className="py-2 flex flex-col gap-2">
            <h5 className="font-bold text-lg text-body">
              <strong>Detalles</strong>
            </h5>
            <table className="w-full text-base">
              <tbody>
                <tr>
                  {[...Array(12)].map((_, i) => (
                    <td
                      key={i}
                      className="border text-xs text-center text-white"
                    >
                      {i + 1}
                    </td>
                  ))}
                </tr>
                {product.categoryId && (
                  <tr>
                    <td colSpan={2} className="font-semibold text-left">
                      Categoría:
                    </td>
                    <td colSpan={10} className="text-left">
                      {category?.title}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
          <h5 className="font-bold text-lg text-body">
            <strong>Descripción</strong>
          </h5>
          <p className={`${fontBody.className} product-description text-lg`}>
            {product.description}
          </p>
        </div>
      </div>
      {relatedProducts && (
        <div className="container flex flex-col gap-2">
          <PageTitle title="Productos Relacionados" />
          <RelatedProducts products={relatedProducts} />
        </div>
      )}
    </div>
  );
}

// export default PublicProductPage;
