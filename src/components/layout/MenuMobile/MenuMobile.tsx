"use client";

import {
  ActiveLink,
  type ActiveLinkProps,
} from "@/components/active-link/ActiveLink";
import { LoginButton } from "@/components/auth/LoginButton";
import { useUIStore } from "@/store";
import { useState } from "react";
import { MdMenu, MdOutlineClose } from "react-icons/md";
import { AccountButton } from "../account/AccountButton";

interface Props {
  navItems: ActiveLinkProps[];
  className?: string;
}

export const MenuMobile = ({ navItems, className }: Props) => {
  const [open, setOpen] = useState(false);
  const openSideMenu = useUIStore((state) => state.openSideMenu);

  const handleMenuButtonClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <button
        className={`md:hidden ${
          className ?? "text-white"
        } transition-all duration-300 hover:cursor-pointer`}
        onClick={openSideMenu}
      >
        {!open ? (
          <MdMenu className="w-8 h-8" />
        ) : (
          <MdOutlineClose className="w-8 h-8" />
        )}
      </button>
      {/* {open && (
        <div className="menu-mobile bg-primary absolute top-0 bottom-0 left-0 z-50 w-72 h-screen transition-all translate-x-0 ease-in-out duration-500">
          <ul className="flex flex-col items-center justify-center space-y-6 h-full text-white">
            {navItems.map((navItem) => (
              <ActiveLink key={navItem.path} {...navItem} />
            ))}
            <AccountButton />
          </ul>
        </div>
      )} */}
    </>
  );
};
