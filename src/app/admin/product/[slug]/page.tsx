//  dynamic revalidate for page, layout or route handler
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getCategories, getProductBySlug, getSizes } from "@/actions";
import { PageTitle, ProductForm } from "@/components";
import Head from "next/head";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function AdminProductPage({ params }: Props) {
  const { slug } = await params;
  // console.log( params.id );

  // const product = await getProduct( params.id );

  // const product = await prisma.product.findUnique({ where: { id: params.id } });

  const [product, categories, sizes] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
    getSizes(),
  ]);

  // TODO: new product
  if (!product && slug !== "new") {
    redirect("/admin/products");
  }

  const title = slug === "new" ? "New Product" : "Edit Product";

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="pbb-admin-product-page flex flex-col gap-4 w-full px-4 md:px-6">
        <PageTitle title={title} subtitle="Manage your product information" />

        <div className="flex flex-col gap-4">
          <ProductForm
            product={product ?? {}}
            sizes={sizes}
            categories={categories}
          />
        </div>
      </div>
    </>
  );
}
