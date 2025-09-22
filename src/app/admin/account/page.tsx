export const dynamic = "force-dynamic";
export const revalidate = 0;

import React, { use } from "react";
import Image from "next/image";
import { Avatar } from "@/components/admin";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { PageTitle } from "@/components";
import { auth } from "@/auth.config";
import Link from "next/link";
import { UserDataForm } from "./ui/UserDataForm";
import { getCountries, getUserAddress } from "@/actions";
import { AddressForm } from "./ui/AddressForm";

export default async function AdminAccountPage() {
  const countries = await getCountries();
  const session = await auth();

  if (!session?.user || !session.user.id) {
    redirect("/auth/login");
  }

  const userAddress = (await getUserAddress(session.user.id)) ?? undefined;

  return (
    <>
      <div className="pbb-admin-account-page flex flex-col gap-4 w-full px-4 md:px-6">
        <PageTitle
          title="Manage Account"
          subtitle="Manage your profile, change password, and manage security"
        >
          {/* <AddNewProductButton /> */}
          {/* <DeleteInactiveProducts /> */}
        </PageTitle>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left */}
            <div className="fade-in col-span-1 flex flex-col items-center gap-8 w-full bg-white text-text-secondary p-8 rounded-lg shadow">
              <div className="flex flex-col items-center justify-center gap-1">
                <p className="text-base text-text-primary font-body font-medium">
                  {session.user.name}
                </p>
                <p className="text-sm text-text-secondary font-body">
                  {session.user.email}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-4">
                <Avatar user={session.user} size={100} />
                <Link
                  href="/admin/account/change-photo"
                  className="btn-primary"
                >
                  Change Profile Picture
                </Link>
              </div>
            </div>

            {/* Right */}
            <div className="w-full col-span-1 lg:col-span-2 flex flex-col gap-4">
              <div className="fade-in col-span-1 lg:col-span-2 flex flex-col items-start justify-start gap-4 w-full bg-white text-text-secondary p-8 rounded-lg shadow">
                <div className="flex items-center gap-2">
                  <h2 className="font-body font-medium text-text-primary">
                    User Information
                  </h2>
                </div>

                <div className="flex flex-col gap-4 w-full">
                  <UserDataForm user={session.user} />
                </div>
              </div>

              {/* User Address */}
              <div className="fade-in col-span-1 lg:col-span-2 flex flex-col items-start justify-start gap-4 w-full bg-white text-text-secondary p-8 rounded-lg shadow">
                <div className="flex flex-col items-start gap-1">
                  <h2 className="font-body font-medium text-text-primary">
                    User Address
                  </h2>
                  <p className="text-sm text-text-secondary">
                    Add, edit or remove your default address for orders and
                    deliveries
                  </p>
                </div>

                <div className="flex flex-col gap-4 w-full">
                  <AddressForm
                    countries={countries}
                    userAddress={userAddress}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
