//  dynamic revalidate for page, layout or route handler
export const dynamic = "force-dynamic";
export const revalidate = 60; // 60 | 0

import { H1, Title, ProductGrid, Pagination } from "@/components";
import { CategoriesTabBar } from "@/categories";

import { notFound } from "next/navigation";
import {
  getCategories,
  getCategoryBySlug,
  getPaginatedProductsWithImages,
} from "@/actions";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const category = await getCategoryBySlug(slug);

    return {
      title: category?.title ?? "Product Not Found",
      description: `${category?.title} category page`,
    };
  } catch (error) {
    return {
      title: "Category page",
      description: "Single category page",
    };
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page } = await searchParams;
  const pageParam = page ? parseInt(page) : 1;

  const category = await getCategoryBySlug(slug);
  // console.log({ category });

  if (!category) return notFound();

  const categories = await getCategories();

  // const products = await prisma.product.findMany({
  //   where: { isActive: true, categoryId: category?.id },
  //   orderBy: { createdAt: "desc" },
  // });

  const { products, totalPages, currentPage, count } =
    await getPaginatedProductsWithImages({ page: pageParam, category });

  // if (products.length === 0) {
  //   redirect("/shop");
  // }

  // TODO: add product schema

  // const schema = {
  //   "@context": "https://schema.org",
  //   "@type": "ItemList",
  //   itemListElement: [
  //     {
  //       "@type": "Product",
  //       name: "Coffee & Rose Bouquet",
  //       image: "https://www.purplebutterflybouquets.com/images/coffee-rose.jpg",
  //       description: "A luxurious bouquet of roses and specialty coffee pods.",
  //       brand: "Purple Butterfly Bouquets",
  //       offers: {
  //         "@type": "Offer",
  //         priceCurrency: "USD",
  //         price: "45.00",
  //         availability: "https://schema.org/InStock",
  //       },
  //     },
  //     {
  //       "@type": "Product",
  //       name: "Tea & Lavender Set",
  //       image:
  //         "https://www.purplebutterflybouquets.com/images/tea-lavender.jpg",
  //       description: "Relaxing tea blends paired with dried lavender.",
  //       brand: "Purple Butterfly Bouquets",
  //       offers: {
  //         "@type": "Offer",
  //         priceCurrency: "USD",
  //         price: "35.00",
  //         availability: "https://schema.org/InStock",
  //       },
  //     },
  //   ],
  // };

  return (
    <>
      <Title title={category.title} />
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      /> */}

      <div className="ppbb-shop-products-page container text-left py-12 flex flex-col gap-16">
        <div className="flex flex-col gap-4 items-center justify-center">
          <H1>Bouquets for every occasion</H1>
          {categories && (
            <CategoriesTabBar
              categories={categories}
              currentCategoryId={category?.id}
            />
          )}
        </div>
        {/* { JSON.stringify( products ) } */}

        <div className="flex flex-col ">
          {products && <ProductGrid products={products} />}
          {products.length > 0 && <Pagination totalPages={totalPages} />}
        </div>
      </div>
    </>
  );
}
