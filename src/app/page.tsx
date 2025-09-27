//  dynamic revalidate for page, layout or route handler
export const dynamic = "force-dynamic";
export const revalidate = 60; // 60 | 0

import { BannerHero, H1, SideMenu } from "@/components";
import { Header } from "@/components/layout/Header";
import { ProductGrid } from "@/components";
import { Footer } from "@/components";
import { getFeaturedProducts } from "@/actions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Purple Butterfly Bouquets | Coffee, Tea & Floral Experiences",
  description:
    "Discover the soul behind Purple Butterfly — where coffee, tea, and floral arrangements come together to create meaningful, personalized gifts that sweeten the soul.",
  openGraph: {
    title: "Purple Butterfly Bouquets | Coffee, Tea & Floral Experiences",
    description:
      "Meet the heart of Purple Butterfly — where every bouquet and brew carries a touch of soul and creativity.",
    url: "https://www.raicesdelalma.com.do",
    type: "website",
    images: [{ url: "https://www.raicesdelalma.com.do/logo.svg" }],
  },
  twitter: {
    title: "Purple Butterfly Bouquets",
    description:
      "Discover the story and inspiration behind our handcrafted coffee, tea, and floral experiences.",
    card: "summary_large_image",
    images: [{ url: "https://www.raicesdelalma.com.do/logo.svg" }],
  },
};

export default async function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Purple Butterfly Bouquets",
    url: "https://www.raicesdelalma.com.do",
    logo: "https://www.raicesdelalma.com.do/logo.svg", // reemplázalo por tu logo real
    sameAs: ["https://www.instagram.com/raicesdelalmard"],
    description:
      "Purple Butterfly creates unique gift experiences through coffee, tea, and floral design.",
    founder: {
      "@type": "Person",
      name: "Alma Puello",
    },
    foundingDate: "2023-01-01",
    foundingLocation: "Delaware, USA",
  };

  const { featuredProducts } = await getFeaturedProducts({ take: 5 });

  //    products.forEach( product => product.slug = `product/${product.slug}`);

  //    const slug = `product/${ product.slug }`

  //    const products = productsResponse.map( product => ({
  //         id: product.id,
  //         title: product.title,
  //         image: product.image,
  //         price: product.price,
  //         rating: product.rating || 0,
  //         slug: `product/${ product.slug }`
  //     }))
  //   const products = await getProducts({ limit: 30, offset: 0 });

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SideMenu />

      <main className="flex min-h-screen flex-col items-center justify-between ">
        <BannerHero
          title="Coffee Bouquets that speak your heart"
          subtitle="A unique gift experience that combines the aroma of premium coffee with the elegance of floral presentation. Perfect for any occasion."
          ctaPath="/shop"
          ctaText="Shop Now"
        />

        <div className="container">
          <div className="latest-products text-center py-12 flex flex-col gap-6">
            <H1>Featured Bouquets</H1>
            {/* { JSON.stringify( products ) } */}
            <div className="flex flex-col ">
              <ProductGrid products={featuredProducts} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
