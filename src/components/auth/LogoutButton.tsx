"use client";

import { useUIStore } from "@/store";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MdLogout } from "react-icons/md";

interface Props {
  className?: string;
}

export const LogoutButton = ({
  className = "text-accent hover:text-gold-pastel group-hover:text-gold-pastel",
}: Props) => {
  const router = useRouter();
  const closeSideMenu = useUIStore((state) => state.closeSideMenu);

  const handleLogout = async () => {
    closeSideMenu();
    await signOut({ redirect: false });
    router.push("/shop");
  };

  return (
    <button
      onClick={handleLogout}
      type="button"
      className={`px-2 py-2 flex items-center space-x-2 rounded-md font-body  group ${className} hover:cursor-pointer`}
    >
      <MdLogout className="w-6 h-6" />
      <span className={`${className}`}>Logout</span>
    </button>
  );
};
