import { PageTitle } from "@/components";
import Head from "next/head";
// import { getAllLegalSlugs, getLegalContent } from "@/lib/get-legal-content";
// import { Metadata } from "next";
import { notFound } from "next/navigation";
// import styles from "./legal.module.css";

// type Props = {
//   params: Promise<{ slug: string }>;
// };

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { slug } = await params;
//   const { title } = await getLegalContent(slug).catch(() => ({
//     title: "Not Found",
//   }));

//   return {
//     title,
//   };
// }

export default async function PrivacyRequestPage() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <PageTitle title="Privacy Request" />
        <div>En construcción</div>
      </main>
    </>
  );
}
