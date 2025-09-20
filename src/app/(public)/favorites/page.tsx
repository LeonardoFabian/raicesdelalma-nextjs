export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getWishlistByUser } from "@/actions";
import { H1, Pagination, Title } from "@/components";
import { ProductGrid } from "@/components";
import { Metadata } from "next";
import { MdOutlineFavoriteBorder } from "react-icons/md";

export const metadata: Metadata = {
  title: "Your Favorite Gifts | Purple Butterfly",
  description:
    "View and manage your favorite coffee bouquets, tea blends, and floral gifts in one place. Curate your soulful collection with Purple Butterfly.",
  openGraph: {
    title: "Your Favorites | Purple Butterfly",
    description:
      "See your saved coffee, tea, and floral gifts — ready when your heart says yes.",
    url: "https://www.purplebutterflybouquets.com/favorites",
    type: "website",
  },
  twitter: {
    title: "Favorites | Purple Butterfly",
    description:
      "Your personal collection of coffee, tea, and flower gifts that touch the soul.",
    card: "summary_large_image",
  },
};

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function FavoritesPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const pageParam = page ? parseInt(page) : 1;

  const { products, count, totalPages, currentPage } = await getWishlistByUser({
    page: pageParam,
    take: 10,
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Favorites",
    description:
      "A list of your favorite personalized gifts from Purple Butterfly.",
    url: "https://www.purplebutterflybouquets.com/favorites",
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "http://schema.org/ItemListOrderAscending",
      numberOfItems: count, // puedes actualizar dinámicamente con el total real
    },
  };

  return (
    <>
      <Title title="Favorites" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* { JSON.stringify( products ) } */}
      <div className="ppbb-favorites-page container text-left py-12 flex flex-col gap-16">
        <div className="flex flex-col gap-4 items-center justify-center">
          <H1>Favorite Products</H1>
        </div>

        {products.length > 0 ? (
          <div className="flex flex-col gap-16">
            {products && <ProductGrid products={products} />}
            {products.length > 0 && <Pagination totalPages={totalPages} />}
          </div>
        ) : (
          <div className="flex flex-col h-[50vh] items-center justify-center text-primary">
            <MdOutlineFavoriteBorder size={100} />
            <span>No Favorites Yet</span>
          </div>
        )}
      </div>
    </>
  );
}
