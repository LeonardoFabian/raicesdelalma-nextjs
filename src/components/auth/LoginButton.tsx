// "use client";

// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
import Link from "next/link";
// import { Avatar } from "../admin";
// import {
//   MdOutlineDashboard,
//   MdOutlinePerson,
//   MdOutlineSettings,
// } from "react-icons/md";
// import { ActiveLinkProps } from "../active-link/ActiveLink";
// import { LogoutButton } from "./LogoutButton";
// import { auth } from "@/auth.config";
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

export const LoginButton = () => {
  // return <button>Login</button>;
  // const session = getServerSession(authOptions);

  return (
    <Link
      href="/auth/login"
      className="flex items-center py-2 px-4 transition-all bg-gold-pastel text-primary font-body font-semibold rounded-lg"
    >
      Log In
    </Link>
  );
};
