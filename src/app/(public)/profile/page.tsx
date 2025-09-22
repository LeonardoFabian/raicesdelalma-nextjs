import React, { use } from "react";
import Image from "next/image";
import { Avatar } from "@/components/admin";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ProductGrid, Title } from "@/components";
import { auth } from "@/auth.config";
import Link from "next/link";
import {
  getOrdersBySessionUser,
  getUserAddress,
  getWishlistByUser,
} from "@/actions";
import { MdInfoOutline } from "react-icons/md";
import { OrdersTable } from "../orders/ui/OrdersTable";
import Head from "next/head";

export default async function PublicProfilePage() {
  //   const { data: session } = useSession();
  const session = await auth();

  if (!session?.user) {
    redirect("/");
    // redirect("/auth/login?returnTo=/profile");
  }

  const user = session.user;

  const { orders: userOrders, count: userOrdersCount } =
    await getOrdersBySessionUser({ page: 1, take: 5 });

  const userAddress = (await getUserAddress(user.id!)) ?? undefined;

  const { products: favoriteProducts, count } = await getWishlistByUser({
    page: 1,
    take: 5,
  });

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Title title="Profile" />

      <div className="pbb-profile-page text-left w-full py-6 md:py-12  flex flex-col gap-16 ">
        <div className="container flex flex-col gap-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left */}
            <div className="fade-in col-span-1 flex flex-col items-center gap-8 w-full bg-white text-text-secondary p-8 rounded-lg shadow">
              <div className="flex flex-col items-center justify-center gap-1">
                <p className="text-base text-text-primary font-body font-medium">
                  {user.name}
                </p>
                <p className="text-sm text-text-secondary font-body">
                  {user.email}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-4">
                <Avatar user={user} size={100} />

                <Link
                  href={
                    user.role === "admin"
                      ? "/admin/account"
                      : "/profile/account"
                  }
                  className="btn-primary"
                >
                  Manage Profile
                </Link>
              </div>
            </div>

            {/* Right */}

            <div className="fade-in col-span-1 flex flex-col items-start justify-start gap-4 w-full bg-white text-text-secondary p-8 rounded-lg shadow">
              <div className="flex flex-col items-start gap-2">
                <h2 className="font-body font-bold text-text-primary">
                  User Information
                </h2>
              </div>

              <div className="w-full flex flex-col items-start gap-4">
                <div className="flex w-full flex-col gap-1">
                  <span>Name</span>
                  <p className="font-body text-text-primary">{user.name}</p>
                </div>
                <div className="flex w-full flex-col gap-1">
                  <span>Email</span>
                  <p className="font-body text-text-primary">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="fade-in col-span-1 flex flex-col items-start justify-start gap-4 w-full bg-white text-text-secondary p-8 rounded-lg shadow">
              <div className="flex flex-col items-start gap-2">
                <h2 className="font-body font-bold text-text-primary">
                  Your Address
                </h2>
                <p className="text-sm text-text-secondary">
                  You can add, edit or remove your default address for orders
                  and deliveries
                </p>
              </div>

              <div className="w-full flex flex-col items-start gap-4">
                {userAddress !== undefined ? (
                  <div className="flex w-full flex-col gap-1">
                    <p className="font-body text-text-primary">{`${userAddress.firstName} ${userAddress.lastName}`}</p>
                    <p>
                      {userAddress.address},{" "}
                      {userAddress.address2 ? `${userAddress.address2}, ` : ""}
                    </p>
                    <p>
                      {userAddress.city}, {userAddress.country}
                    </p>
                    <p>{userAddress.postalCode}</p>
                    <p>{userAddress.phone}</p>
                  </div>
                ) : (
                  <div className="alert alert-default">
                    <MdInfoOutline size={24} />
                    <span>
                      You don&apos;t have a stored address, but you can
                      optionally store it from your profile administration or
                      when setting the shipping address.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <section className="pbb-user-latest-orders flex flex-col gap-4">
            <div className="section-header flex items-center justify-between space-x-4 border-b pb-4 border-gray-300">
              <h2 className="font-semibold text-2xl">Your latest orders</h2>
              <Link href="/orders" className="text-link hover:underline">
                View all
              </Link>
            </div>

            {userOrders && userOrders.length > 0 ? (
              <OrdersTable orders={userOrders} />
            ) : (
              <span className="alert alert-default">
                <MdInfoOutline size={24} />

                <span className="flex flex-col gap-1">
                  <strong>You haven't placed any orders yet!</strong>
                  <span>
                    It looks like you haven't made any purchases yet. If you're
                    ready to buy something, browse our{" "}
                    <Link href="/shop" className="text-link hover:underline">
                      Shop
                    </Link>{" "}
                    and start adding items to your cart. We're here to help you
                    every step of the way!
                  </span>
                </span>
              </span>
            )}
          </section>

          <section className="pbb-user-latest-orders flex flex-col gap-4">
            <div className="section-header flex items-center justify-between space-x-4 border-b pb-4 border-gray-300">
              <h2 className="font-semibold text-2xl">Your favorite products</h2>
              <Link href="/favorites" className="text-link hover:underline">
                View all
              </Link>
            </div>

            {favoriteProducts.length > 0 ? (
              <ProductGrid products={favoriteProducts} />
            ) : (
              <div className="alert alert-default">
                <MdInfoOutline size={24} />
                <span>
                  You don&apos;t have products added to your{" "}
                  <Link href="/favorites" className="text-link hover:underline">
                    Favorites
                  </Link>{" "}
                  list. If you want to add a product to your favorites list, you
                  can do so from{" "}
                  <Link href="/shop" className="text-link hover:underline">
                    Shop
                  </Link>{" "}
                  or from the product details page by clicking on the heart
                  icon.
                </span>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
