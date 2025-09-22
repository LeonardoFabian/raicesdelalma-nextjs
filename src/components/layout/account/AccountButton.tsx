"use client";

import { LoginButton } from "@/components/auth/LoginButton";
import { Avatar } from "@/components/admin";
import { useSession } from "next-auth/react";
import { useUIStore } from "@/store";
// import { accountNavItems } from "@/auth";

interface Props {
  className?: React.ButtonHTMLAttributes<HTMLButtonElement>["className"];
}

export const AccountButton = ({ className }: Props) => {
  const openSideMenu = useUIStore((state) => state.openSideMenu);
  // return <button>Login</button>;
  // const session = getServerSession(authOptions);

  // const session = await auth();
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;

  if (isAuthenticated) {
    return (
      <button
        type="button"
        onClick={openSideMenu}
        className={
          className
            ? className
            : "flex items-center gap-2 text-text-primary bg-transparent hover:bg-white/10 cursor-pointer py-2 px-0 md:px-4 rounded-lg focus:outline-none focus:ring-none font-body font-semibold whitespace-nowrap"
        }
      >
        <Avatar
          user={session?.user}
          // menuItems={accountNavItems}
        />
        <span className="hidden md:inline-block">{session?.user?.name}</span>
      </button>
    );
  } else {
    return <LoginButton />;
  }
};
