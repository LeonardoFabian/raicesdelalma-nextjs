"use client";

import {
  ActiveLink,
  ActiveLinkProps,
} from "@/components/active-link/ActiveLink";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { useUIStore } from "@/store/index";
import { IUser } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
  user: IUser;
  size?: number;
  template?: "card" | "profile" | "button";
  menuItems?: ActiveLinkProps[];
  className?: string;
}

export const Avatar = ({
  user,
  size = 50,
  template = "button",
  menuItems,
  className = "text-text-primary hover:text-primary",
}: Props) => {
  const [open, setOpen] = useState(false);
  const openSideMenu = useUIStore((state) => state.openSideMenu);

  const handleOnClick = () => {
    setOpen(!open);
  };

  return (
    <div className="relative flex justify-center">
      <button
        onClick={openSideMenu}
        type="button"
        className={`${
          template === "button" || template === "profile"
            ? "inline-flex gap-3"
            : "flex flex-col items-center justify-center"
        } relative  space-x-4 items-center bg-transparent hover:bg-white/10 hover:cursor-pointer py-2 px-0 md:px-2 rounded-lg focus:outline-none focus:ring-none`}
      >
        <Image
          className="rounded-full mx-auto"
          src={
            user?.image ??
            "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib"
          }
          alt="Purple Butterfly Logo"
          width={size ?? "auto"}
          height={size ?? "auto"}
        />

        {user && user.name && (
          <span
            className={`${
              template === "button" || template === "profile"
                ? "hidden md:flex items-start"
                : "flex items-center"
            } flex-col  ${className}`}
          >
            <span className="text-base font-body font-medium ">
              {user.name ?? "John Doe"}
            </span>
            {template === "card" || (template === "profile" && user.email) ? (
              <span className="text-xs font-body text-left">
                {user.email ?? "account@example.com"}
              </span>
            ) : (
              ""
            )}
            {template !== "button" && user?.role && (
              <span className="text-xs font-body capitalize">{user?.role}</span>
            )}
          </span>
        )}
      </button>
      {open && menuItems && menuItems.length > 0 && (
        <div className="p-2 bg-white text-text-primary rounded-lg shadow-2xl absolute top-10 right-0 z-50 w-48">
          {menuItems.map((menuItem, index) => (
            <div key={index}>
              <ActiveLink
                path={menuItem.path}
                label={menuItem.label}
                icon={menuItem.icon}
                className="text-text-secondary"
              >
                {menuItem.children ?? ""}
              </ActiveLink>
            </div>
          ))}
          {/* <LogoutButton
            className={
              "text-text-secondary hover:text-primary group-hover:text-primary"
            }
          /> */}
        </div>
      )}
    </div>
  );
};
