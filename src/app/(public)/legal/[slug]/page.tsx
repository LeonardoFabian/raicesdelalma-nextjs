import { PageTitle } from "@/components";
import { getAllLegalSlugs, getLegalContent } from "@/lib/get-legal-content";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { title } = await getLegalContent(slug).catch(() => ({
    title: "Not Found",
  }));

  return {
    title,
  };
}

export default async function LegalPage({ params }: Props) {
  const { slug } = await params;

  try {
    const { title, content } = await getLegalContent(slug);

    return (
      <main className="max-w-3xl mx-auto px-4 py-10 prose">
        <PageTitle title={title} />
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </main>
    );
  } catch (error) {
    notFound();
  }
}

export async function generateStaticParams() {
  const slugs = getAllLegalSlugs();

  return slugs.map((slug) => ({ slug }));
}
