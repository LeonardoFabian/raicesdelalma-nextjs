//  dynamic revalidate for page, layout or route handler
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { PageTitle, Pagination, ProductsTable } from "@/components";
import { redirect } from "next/navigation";
// import { DeleteInactiveProducts } from "@/components";
import { auth } from "@/auth.config";
import { AddNewProductButton } from "./ui/AddNewProductButton";
import { getPaginatedProductsWithImages } from "@/actions";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function AdminProductsPage({ searchParams }: Props) {
  const session = await auth();
  // server session
  // const user = getServerSideUserSession();

  if (!session?.user) {
    redirect("/auth/login");
  }

  if (session?.user?.role !== "admin") {
    redirect("/shop");
  }

  const { page } = await searchParams;
  const pageParam = page ? parseInt(page) : 1;

  const headings = [
    "Image",
    "Title",
    "Category",
    "Base Price",
    "Discount (%)",
    "Sizes",
    "Stock",
    "Extra Price",
    "Rating",
    "Status",
    "Action",
  ];

  // const products = await getProducts({ limit: 30, offset: 0, basePath: '/admin/product' });

  const { products, totalPages, currentPage, count } =
    await getPaginatedProductsWithImages({ take: 4, page: pageParam });

  console.log("admin products: ", products);

  // const productsArray = products.map( product => ({
  //     id: product.id,
  //     image: product.image,
  //     title: product.title,
  //     category: product.category,
  //     price: product.price,
  //     rating: product.rating || 0,
  // }))

  return (
    <>
      {/* { JSON.stringify( products ) } */}
      <div className="pbb-admin-products-page flex flex-col gap-4 w-full px-4 md:px-6">
        <PageTitle title="Products" subtitle="Manage your Products">
          <AddNewProductButton />
          {/* <DeleteInactiveProducts /> */}
        </PageTitle>

        {/* <ProductGrid products={ products } /> */}

        <div className="flex flex-col gap-4">
          {products.length > 0 && (
            <div className="w-full overflow-x-auto">
              <ProductsTable headings={headings} products={products} />
            </div>
          )}
          {products.length > 0 && <Pagination totalPages={totalPages} />}
        </div>
      </div>
    </>
  );
}
