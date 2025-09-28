import { Title } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Purple Butterfly | Send Us Your Questions or Feedback",
  description:
    "We'd love to hear from you! Reach out to Purple Butterfly for inquiries, special requests, or collaboration opportunities.",
  openGraph: {
    title: "Get in Touch with Purple Butterfly",
    description:
      "Questions, requests or feedback? We're here to help you with all your gifting needs.",
    url: "https://www.purplebutterflybouquets.com/contact",
    type: "website",
  },
  twitter: {
    title: "Contact Us | Purple Butterfly",
    description:
      "Reach out for questions, feedback, or to customize your next soulful gift.",
    card: "summary_large_image",
  },
};

export default function ContactPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Purple Butterfly",
    description:
      "Contact us for inquiries, gift customizations, or partnerships.",
    url: "https://www.purplebutterflybouquets.com/contact",
    potentialAction: {
      "@type": "CommunicateAction",
      target: "mailto:almapuello@gmail.com",
      name: "Send Email",
    },
    mainEntity: {
      "@type": "Organization",
      name: "Purple Butterfly Bouquets",
      contactPoint: {
        "@type": "ContactPoint",
        email: "almapuello@gmail.com",
        contactType: "Customer Support",
        areaServed: "US",
        availableLanguage: ["English", "Spanish"],
      },
    },
  };

  return (
    <>
      <Title title="Contáctanos" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
