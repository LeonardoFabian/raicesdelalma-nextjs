//  dynamic revalidate for page, layout or route handler
export const dynamic = "force-dynamic";
export const revalidate = 60; // 60 | 0

import { BannerHero, H1, SideMenu } from "@/components";
import { Header } from "@/components/layout/Header";
import { ProductGrid } from "@/components";
import { Footer } from "@/components";
import { getFeaturedProducts } from "@/actions";

export default async function Home() {
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
