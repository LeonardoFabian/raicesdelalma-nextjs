"use client";

import React, { use } from "react";
import Image from "next/image";
import { Avatar } from "@/components/admin";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function ProfilePage() {
  const { data: session } = useSession();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const user = session.user;

  return (
    <>
      <div className="flex flex-col gap-4 px-0 md:px-6">
        <div className="flex items-center justify-between space-x-4">
          <h1 className="font-semibold text-2xl">Profile</h1>
        </div>

        <div className="flex flex-col gap-1 w-full bg-white text-text-secondary p-4 rounded-lg">
          <Avatar
            user={session.user}
            template="profile"
            className="text-text-primary "
          />
        </div>
      </div>
    </>
  );
}
