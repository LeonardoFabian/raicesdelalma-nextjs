import type { Metadata } from "next";
import { Navbar, Footer, SideMenu, HydrateZustandWishlist } from "@/components";
import { ScrollToTopButton } from "@/components";
import { getWishlistByUser } from "@/actions";

export const metadata: Metadata = {
  title: {
    template: "%s | Purple Butterfly Bouquets",
    default: "Purple Butterfly Bouquets",
  },
  description:
    "Where coffee, tea, and floral arrangements come together to create meaningful, personalized gifts that sweeten the soul.",
};

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { products } = await getWishlistByUser({ page: 1, take: 100 });
  const productIds = products.map((product) => product.id);

  return (
    <>
      {productIds && productIds.length > 0 && (
        <HydrateZustandWishlist initialState={productIds} />
      )}
      <Navbar />
      <SideMenu />
      <main className="flex flex-col bg-white min-h-screen">{children}</main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
