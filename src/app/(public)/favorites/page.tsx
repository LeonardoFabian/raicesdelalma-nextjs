import { H1, PageHeader } from "@/src/components";
import { FavoriteProducts, Product, ProductGrid, ProductsResponse } from "@/src/products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Favorite Gifts | Purple Butterfly",
  description: "View and manage your favorite coffee bouquets, tea blends, and floral gifts in one place. Curate your soulful collection with Purple Butterfly.",
  openGraph: {
    title: "Your Favorites | Purple Butterfly",
    description: "See your saved coffee, tea, and floral gifts — ready when your heart says yes.",
    url: "https://www.purplebutterflybouquets.com/favorites",
    type: "website",
  },
  twitter: {
    title: "Favorites | Purple Butterfly",
    description: "Your personal collection of coffee, tea, and flower gifts that touch the soul.",
    card: "summary_large_image",
  },
};

export default async function FavoritesPage() {

    const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Favorites",
    "description": "A list of your favorite personalized gifts from Purple Butterfly.",
    "url": "https://www.purplebutterflybouquets.com/favorites",
    "mainEntity": {
      "@type": "ItemList",
      "itemListOrder": "http://schema.org/ItemListOrderAscending",
      "numberOfItems": 0 // puedes actualizar dinámicamente con el total real
    }
  };

    return (
        <>
            <PageHeader title="Favorites" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            
            {/* { JSON.stringify( products ) } */}
            <div className="latest-products text-left w-full py-12 px-4 md:px-12 flex flex-col justify-start gap-6">

                <H1>Favorite Products</H1>

                <FavoriteProducts />

            </div>
        </>
    )
}

