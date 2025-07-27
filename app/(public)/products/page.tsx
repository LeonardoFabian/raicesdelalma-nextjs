import { H1, PageHeader } from "@/components"
import type { Metadata } from "next"

const metadata: Metadata = {
    title: "Shop Coffee Bouquets, Tea & Flowers | Purple Butterfly",
    description: "Explore our handcrafted coffee bouquets, tea gifts, and floral arrangements — perfect for every occasion. Delivered with heart from Purple Butterfly.",
    openGraph: {
    title: "Shop Coffee Bouquets, Tea & Flowers",
    description: "Unique gifts for every soul — shop coffee, tea, and floral arrangements made with love.",
    url: "https://www.purplebutterflybouquets.com/products",
    type: "website",
  },
  twitter: {
    title: "Explore Our Products | Purple Butterfly",
    description: "Browse our personalized coffee, tea, and flower gifts — made to sweeten the soul.",
    card: "summary_large_image",
  },
}

export default function ProductsPage() {

    // const schema = {
    //     "@context": "https://schema.org",
    //     "@type": "ItemList",
    //     itemListElement: [
    //       {
    //         "@type": "Product",
    //         name: "Coffee & Rose Bouquet",
    //         image: "https://www.purplebutterflybouquets.com/images/coffee-rose.jpg",
    //         description: "A luxurious bouquet of roses and specialty coffee pods.",
    //         brand: "Purple Butterfly Bouquets",
    //         offers: {
    //           "@type": "Offer",
    //           priceCurrency: "USD",
    //           price: "45.00",
    //           availability: "https://schema.org/InStock"
    //         }
    //       },
    //       {
    //         "@type": "Product",
    //         name: "Tea & Lavender Set",
    //         image: "https://www.purplebutterflybouquets.com/images/tea-lavender.jpg",
    //         description: "Relaxing tea blends paired with dried lavender.",
    //         brand: "Purple Butterfly Bouquets",
    //         offers: {
    //           "@type": "Offer",
    //           priceCurrency: "USD",
    //           price: "35.00",
    //           availability: "https://schema.org/InStock"
    //         }
    //       }
    //     ]
    // }

    return (
        <>
            <PageHeader title="Products" />
            {/* <script 
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            /> */}
        </>
    )
}