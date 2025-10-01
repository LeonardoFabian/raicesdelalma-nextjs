import { Title } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nosotros | Ráices del Alma",
  description:
    "Conoce la historia de Ráices del Alma — una marca dedicada a crear jabones artesanales, cosmética natural y productos hechos con amor desde la raíz.",
  openGraph: {
    title: "Sobre Nosotros | Ráices del Alma",
    description:
      "En Ráices del Alma creemos que el cuidado debe sentirse natural. Descubre nuestra esencia, nuestra historia y el propósito que nos mueve.",
    url: "https://www.purplebutterflybouquets.com/about",
    type: "website",
    images: [
      {
        url: "https://www.raicesdelalma.com.do/logo.svg", // puedes cambiar esto por una imagen de la fundadora o taller
        width: 800,
        height: 600,
        alt: "Equipo de Ráices del Alma",
      },
    ],
  },
  twitter: {
    title: "Sobre Ráices del Alma",
    description:
      "Descubre la historia detrás de nuestros productos naturales y artesanales. Inspirados por la tierra, guiados por el alma.",
    card: "summary_large_image",
    images: [
      {
        url: "https://www.raicesdelalma.com.do/logo.svg",
      },
    ],
  },
};

export default function AboutPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ráices del Alma",
    url: "https://www.raicesdelalma.com.do",
    logo: "https://www.raicesdelalma.com.do/logo.svg", // reemplázalo por tu logo real
    sameAs: ["https://www.instagram.com/raicesdelalmard"],
    description:
      "Ráices del Alma nace del deseo de ofrecer bienestar desde lo natural. Elaboramos productos artesanales como jabones, bálsamos y velas con ingredientes puros y conciencia ecológica.",
    founder: {
      "@type": "Person",
      name: "Alma Inoa",
      sameAs: "https://www.instagram.com/raicesdelalmard",
    },
    foundingDate: "2025-02-01",
    foundingLocation: "Higüey, República Dominicana",
  };

  return (
    <>
      <Title title="Sobre Nosotros" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
