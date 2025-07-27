import { H1, PageHeader } from "@/components"
import type { Metadata } from "next"

const metadata: Metadata = {
    title: "Customize Your Gift | Build a Coffee or Floral Box | Purple Butterfly",
    description: "Create a one-of-a-kind gift with our customization options. Choose from coffee, tea, flowers, and surprise accessories — tailored with love.",
    openGraph: {
    title: "Customize Your Gift",
    description: "Build your perfect box with coffee, tea, flowers, and more. Thoughtful gifts made personal.",
    url: "https://yourdomain.com/customize",
    type: "website",
  },
  twitter: {
    title: "Create Your Gift | Purple Butterfly",
    description: "Mix and match coffee, tea, and florals to build a gift that truly reflects the soul.",
    card: "summary_large_image",
  },
}

export default function CustomizePage() {

    // const schema = {
    //     "@context": "https://schema.org",
    //     "@type": "Service",
    //     serviceType: "Customized Gift Bundling",
    //     provider: {
    //       "@type": "Organization",
    //       name: "Purple Butterfly Bouquets",
    //       url: "https://www.purplebutterflybouquets.com"
    //     },
    //     areaServed: {
    //       "@type": "Place",
    //       address: {
    //         "@type": "PostalAddress",
    //         addressLocality: "Milford",
    //         addressRegion: "DE",
    //         addressCountry: "US"
    //       }
    //     },
    //     description: "Build your own gift box with coffee, teas, flowers, and surprise accessories.",
    // }

    return (
        <>
            <PageHeader title="Customize Your Gift" />
            {/* <script 
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            /> */}
        </>
    )
}