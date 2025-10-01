//  dynamic revalidate for page, layout or route handler
export const dynamic = "force-dynamic";
export const revalidate = 60; // 60 | 0

import { BannerHero, H1, ProductsGridCard, SideMenu } from "@/components";
import { Header } from "@/components/layout/Header";
import { ProductGrid } from "@/components";
import { Footer } from "@/components";
import { getCategories, getFeaturedProducts } from "@/actions";
import type { Metadata } from "next";
import { fontHeading } from "@/config/fonts";

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
  const categories = await getCategories();

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
          title="Porque el cuidado debe sentirse natural"
          subtitle="Jabones artesanales y productos de cuidado personal elaborados con ingredientes puros, vegetales y sostenibles. Cuidamos tu piel y el planeta."
          ctaPath="/shop"
          ctaText="Accede a nuestro catálogo"
        />

        <div className="container">
          <section className="featured-products-section text-center py-12 flex flex-col gap-6">
            <h2 className="font-heading text-4xl font-medium">
              Productos Destacados
            </h2>
            {/* { JSON.stringify( products ) } */}
            <div className="flex flex-col ">
              <ProductGrid products={featuredProducts} />
            </div>
          </section>

          <section className="products-by-category-section text-center py-12 flex flex-col gap-6">
            <h2 className="font-heading text-4xl font-medium">
              Productos por Categoría
            </h2>
            {/* { JSON.stringify( products ) } */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <ProductsGridCard
                  key={category.id}
                  category={category}
                  products={category.products}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
