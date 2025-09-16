"use client";

import React, { use } from "react";
import Image from "next/image";
import { Avatar } from "@/components/admin";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { PageTitle } from "@/components";

export default function ReportsPage() {
  const { data: session } = useSession();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const user = session.user;

  return (
    <>
      <div className="flex flex-col gap-4 w-full px-0 md:px-6">
        <PageTitle title="Reports" subtitle="Manage your business reports">
          {/* <AddNewProductButton /> */}
          {/* <DeleteInactiveProducts /> */}
        </PageTitle>

        {/* <ProductGrid products={ products } /> */}

        <div className="flex flex-col gap-4">Reports here</div>
      </div>
    </>
  );
}
