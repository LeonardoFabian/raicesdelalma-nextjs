import { BannerHero, H1 } from '@/src/components'
import Link from "next/link"
import { getProducts } from './dashboard/products/page'
import { ProductGrid } from '../products';

export default async function Main() {

  const products = await getProducts(8, 0);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <BannerHero title="Coffee Bouquets that speak your heart" subtitle="A unique gift experience that combines the aroma of premium coffee with the elegance of floral presentation. Perfect for any occasion." cta={<Link href="/products" className="bg-primary hover:bg-accent text-white font-heading font-semibold rounded-lg px-8 py-4 transition-all">Shop Now</Link>} />

      <div className="px-4 lg:px-24 py-5">
        <div className="latest-products text-center py-12 flex flex-col gap-6">
          <H1>Latest Products</H1>
          {/* { JSON.stringify( products ) } */}
          <div className="flex flex-col ">
              <ProductGrid products={ products } />

          </div>
      </div>
      </div>
    </main>
  )
}
