"use client";

import React, { use } from "react";
import Image from "next/image";
import { Avatar } from "@/components/admin";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { PageTitle } from "@/components";
import Head from "next/head";

export default function SettingsPage() {
  const { data: session } = useSession();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const user = session.user;

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="pbb-admin-settings-page flex flex-col gap-4 w-full px-4 md:px-6">
        <PageTitle title="Settings" subtitle="Manage your business settings">
          {/* <AddNewProductButton /> */}
          {/* <DeleteInactiveProducts /> */}
        </PageTitle>

        {/* <ProductGrid products={ products } /> */}

        <div className="flex flex-col gap-4">Settings here</div>
      </div>
    </>
  );
}
