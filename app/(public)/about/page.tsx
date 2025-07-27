import { H1, PageHeader } from "@/components";
import type { Metadata } from "next"


export const metadata: Metadata = {
    title: 'About Purple Butterfly | Coffee, Tea & Floral Experiences',
    description: 'Discover the soul behind Purple Butterfly — where coffee, tea, and floral arrangements come together to create meaningful, personalized gifts that sweeten the soul.',   
    openGraph: {
    title: "About Purple Butterfly | Coffee, Tea & Floral Experiences",
    description: "Meet the heart of Purple Butterfly — where every bouquet and brew carries a touch of soul and creativity.",
    url: "https://yourdomain.com/about-us",
    type: "website",
  },
  twitter: {
    title: "About Purple Butterfly",
    description: "Discover the story and inspiration behind our handcrafted coffee, tea, and floral experiences.",
    card: "summary_large_image",
  },
}

export default function AboutPage() {

    // const schema = {
    //     "@context": "https://schema.org",
    //     "@type": "Organization",
    //     "name": "Purple Butterfly Bouquets",
    //     "url": "https://www.purplebutterflybouquets.com",
    //     "logo": "https://www.purplebutterflybouquets.com/logo.svg", // reemplázalo por tu logo real
    //     "sameAs": [
    //         "https://www.instagram.com/purplebutterflyde",
    //     ],
    //     "description": "Purple Butterfly creates unique gift experiences through coffee, tea, and floral design.",
    //     "founder": {
    //         "@type": "Person",
    //         "name": "Alma Puello"
    //     },
    //     "foundingDate": "2023-01-01",
    //     "foundingLocation": "Delaware, USA"
    // };

    return (
        <>
            <PageHeader title="About Us" />
            {/* <script 
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            /> */}
       </>
    )
}