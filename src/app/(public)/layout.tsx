import type { Metadata } from "next";
import { Navbar, Footer, SideMenu } from "@/components";

export const metadata: Metadata = {
  title: {
    template: "%s | Purple Butterfly Bouquets",
    default: "Purple Butterfly Bouquets",
  },
  description:
    "Where coffee, tea, and floral arrangements come together to create meaningful, personalized gifts that sweeten the soul.",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <SideMenu />
      <main className="flex flex-col bg-white min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
