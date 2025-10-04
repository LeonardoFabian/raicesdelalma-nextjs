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
import PageTransition from "@/components/layout/animations/motion/PageTransition";

export const metadata: Metadata = {
  title: "Ráices del Alma | Porque el cuidado debe sentirse natural",
  description:
    "Descubre la esencia de Ráices del Alma — jabones artesanales, cosmética natural y productos hechos con amor para cuidar tu cuerpo y alma de forma consciente.",
  openGraph: {
    title: "Raíces del Alma | Porque el cuidado debe sentirse natural",
    description:
      "Conecta con lo natural a través de productos hechos a mano: jabones artesanales, aceites esenciales, velas y más. Cuidado auténtico, desde el alma.",
    url: "https://www.raicesdelalma.com.do",
    type: "website",
    images: [
      {
        url: "https://www.raicesdelalma.com.do/logo.svg",
        width: 800,
        height: 600,
        alt: "Logo de Raíces del Alma",
      },
    ],
  },
  twitter: {
    title: "Raíces del Alma",
    description:
      "Bienestar natural a través de jabones artesanales y productos hechos a mano. Descubre el cuidado que nace desde la raíz.",
    card: "summary_large_image",
    images: [{ url: "https://www.raicesdelalma.com.do/logo.svg" }],
  },
};

export default async function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Raíces del Alma",
    url: "https://www.raicesdelalma.com.do",
    logo: "https://www.raicesdelalma.com.do/logo.svg", // reemplázalo por tu logo real
    sameAs: ["https://www.instagram.com/raicesdelalmard"],
    description:
      "Ráices del Alma crea productos artesanales como jabones naturales, cosmética consciente y velas hechas a mano para promover el bienestar desde lo natural.",
    founder: {
      "@type": "Person",
      name: "Alma Inoa",
    },
    foundingDate: "2025-02-01",
    foundingLocation: "Higüey, República Dominicana",
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
        <PageTransition>
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
        </PageTransition>
      </main>

      <Footer />
    </>
  );
}
