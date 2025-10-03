import { getSettings } from "@/actions";
import { Title } from "@/components";
import type { Metadata } from "next";
import { ContactForm } from "./ui/ContactForm";

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

export default async function ContactPage() {
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

  const settings = await getSettings();

  return (
    <>
      <Title title="Contáctanos" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="rda-contact-page flex flex-col gap-12 py-0  md:py-12 px-0 md:px-8 lg:px-12 xl:px-28 mx-auto w-full">
        <div className="container-fluid grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10">
          {/* left */}
          <div className="col-span-1 lg:col-span-7 relative w-full px-6 lg:px-0">
            <ContactForm />
          </div>

          <div className="hidden lg:inline-block lg:col-span-1"></div>

          {/* right */}
          <div className="rda-contact-info px-6 pb-5 md:pb-0 md:px-0 col-span-1 lg:col-span-4 flex flex-col gap-4">
            <h2 className="fond-body text-text-primary text-2xl font-semibold">
              Información de Contacto
            </h2>
            {settings?.businessName && (
              <p className="fond-body text-text-secondary font-medium text-base">
                {settings?.businessName}
              </p>
            )}
            <p className="fond-body text-text-secondary text-base">
              Carretera Mella Km.6, Santana,
              <br />
              Higüey, R.D., 23000
            </p>
            {settings?.email && (
              <p className="fond-body text-text-secondary text-base">
                {settings?.email}
              </p>
            )}
            {settings?.phone && (
              <p className="fond-body text-text-secondary text-base">
                {settings?.phone}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
