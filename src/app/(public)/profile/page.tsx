import React, { use } from "react";
import Image from "next/image";
import { Avatar } from "@/components/admin";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Title } from "@/components";
import { auth } from "@/auth.config";
import Link from "next/link";

export default async function PublicProfilePage() {
  //   const { data: session } = useSession();
  const session = await auth();

  if (!session?.user) {
    redirect("/");
    // redirect("/auth/login?returnTo=/profile");
  }

  const user = session.user;

  return (
    <>
      <Title title="Profile" />

      <div className="pbb-profile-page text-left w-full py-6 md:py-12  flex flex-col gap-16 ">
        <div className="container flex flex-col gap-16">
          <div className="flex flex-col gap-1 w-full bg-white text-text-secondary px-4 py-8 rounded-lg">
            <Avatar
              user={user}
              template="profile"
              className="text-text-primary "
            />
          </div>

          <section className="pbb-user-latest-orders">
            <div className="section-header flex items-center justify-between space-x-4 border-b pb-4 border-gray-300">
              <h2 className="font-semibold text-2xl">Latest Orders</h2>
              <Link
                href="/orders"
                className="text-primary-hover hover:underline"
              >
                View all orders
              </Link>
            </div>
          </section>

          <section className="pbb-user-latest-orders">
            <div className="section-header flex items-center justify-between space-x-4 border-b pb-4 border-gray-300">
              <h2 className="font-semibold text-2xl">Favorite Products</h2>
              <Link
                href="/favorites"
                className="text-primary-hover hover:underline"
              >
                View my wishlist
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
