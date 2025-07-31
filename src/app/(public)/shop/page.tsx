import { H1, PageHeader } from "@/src/components"
import { Product, ProductGrid, ProductsResponse } from "@/src/products";
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Shop Coffee Bouquets, Tea & Flowers | Purple Butterfly",
    description: "Explore our handcrafted coffee bouquets, tea gifts, and floral arrangements — perfect for every occasion. Delivered with heart from Purple Butterfly.",
    openGraph: {
    title: "Shop Coffee Bouquets, Tea & Flowers",
    description: "Unique gifts for every soul — shop coffee, tea, and floral arrangements made with love.",
    url: "https://www.purplebutterflybouquets.com/shop",
    type: "website",
  },
  twitter: {
    title: "Explore Our Products | Purple Butterfly",
    description: "Browse our personalized coffee, tea, and flower gifts — made to sweeten the soul.",
    card: "summary_large_image",
  },
}

export const getProducts = async ( limit: number = 25, offset: number = 0 ): Promise<Product[]> => {
    const data: ProductsResponse = await fetch(`https://dummyjson.com/products?limit=${ limit }&skip=${ offset }`)
        .then( res => res.json() );

    const products = data.products.map( product => ({
        id: product.id,
        title: product.title,
        thumbnail: product.images[0],
        price: product.price,
        rating: product.rating || 0,
        link: `/product/${ product.id }`
    }))

    // throw new Error('Error al obtener los productos');

    return products;
}

export default async function ShopPage() {

    const products = await getProducts(30, 0);

    const schema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: [
          {
            "@type": "Product",
            name: "Coffee & Rose Bouquet",
            image: "https://www.purplebutterflybouquets.com/images/coffee-rose.jpg",
            description: "A luxurious bouquet of roses and specialty coffee pods.",
            brand: "Purple Butterfly Bouquets",
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              price: "45.00",
              availability: "https://schema.org/InStock"
            }
          },
          {
            "@type": "Product",
            name: "Tea & Lavender Set",
            image: "https://www.purplebutterflybouquets.com/images/tea-lavender.jpg",
            description: "Relaxing tea blends paired with dried lavender.",
            brand: "Purple Butterfly Bouquets",
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              price: "35.00",
              availability: "https://schema.org/InStock"
            }
          }
        ]
    }

    return (
        <>
            <PageHeader title="Shop" />
            <script 
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            <div className="latest-products text-left py-12 px-12 flex flex-col gap-6">
                  <H1>Products for you</H1>
                  {/* { JSON.stringify( products ) } */}
                  <div className="flex flex-col ">
                      <ProductGrid products={ products } />
                  </div>
              </div>
           
        </>
    )
}