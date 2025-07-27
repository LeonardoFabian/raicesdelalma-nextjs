import { BannerHero } from '@/components'
import Image from 'next/image'
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24 py-5">
      <BannerHero title="Coffee Bouquets that speak your heart" subtitle="A unique gift experience that combines the aroma of premium coffee with the elegance of floral presentation. Perfect for any occasion." cta={<Link href="/products" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg px-8 py-4 transition-all">Shop Now</Link>} />
    </main>
  )
}
