"use client";

// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
import Link from "next/link";
import {
  MdOutlineDashboard,
  MdOutlinePerson,
  MdOutlineSettings,
} from "react-icons/md";
import { auth } from "@/auth.config";
import { LoginButton } from "@/components/auth/LoginButton";
import { Avatar } from "@/components/admin";
import { useSession } from "next-auth/react";
// import { accountNavItems } from "@/auth";

// const accountNavItems: ActiveLinkProps[] = [
//   {
//     path: "/admin",
//     label: "Admin",
//     icon: <MdOutlineDashboard className="w-6 h-6" />,
//   },
//   {
//     path: "/admin/profile",
//     label: "Profile",
//     icon: <MdOutlinePerson className="w-6 h-6" />,
//   },
//   {
//     path: "/admin/settings",
//     label: "Settings",
//     icon: <MdOutlineSettings className="w-6 h-6" />,
//   },
//   {
//     path: "/admin/logout",
//     label: "Logout",
//     children: (
//       <LogoutButton className="text-text-secondary hover:text-primary group-hover:text-primary" />
//     ),
//   },
// ];

interface Props {
  className?: string;
}

export const AccountButton = ({ className }: Props) => {
  // return <button>Login</button>;
  // const session = getServerSession(authOptions);

  // const session = await auth();
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;

  if (isAuthenticated) {
    return (
      <Avatar
        user={session?.user}
        // menuItems={accountNavItems}
        size={32}
        className={`${className ? className : "text-white"}`}
      />
    );
  } else {
    return <LoginButton />;
  }
};
