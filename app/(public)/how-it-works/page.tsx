import { H1, PageHeader } from "@/components"
import type { Metadata } from "next"

const metadata: Metadata = {
    title: "How Purple Butterfly Works | Coffee & Floral Gift Delivery",
    description: "Learn how to order your personalized gift from Purple Butterfly in just a few steps. Easy, heartfelt, and beautifully delivered.",
    openGraph: {
    title: "How It Works",
    description: "From choosing your bouquet to delivery — here’s how Purple Butterfly brings your gifts to life.",
    url: "https://yourdomain.com/how-work",
    type: "website",
  },
  twitter: {
    title: "How It Works | Purple Butterfly",
    description: "Understand our simple process to create and send beautiful personalized gifts.",
    card: "summary_large_image",
  },
}

export default function HowWorkPage() {

    // const schema = {
    //     "@context": "https://schema.org",
    //     "@type": "WebPage",
    //     name: "How It Works - Purple Butterfly",
    //     description: "Step-by-step guide on how to choose, customize, and send a unique gift through Purple Butterfly.",
    //     url: "https://www.purplebutterflybouquets.com/how-it-works"
    // }

    return (
        <>
            <PageHeader title="How It Works" />
            {/* <script 
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            /> */}
        </>
    )
}