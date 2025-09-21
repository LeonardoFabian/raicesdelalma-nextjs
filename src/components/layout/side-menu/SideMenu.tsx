"use client";

import { ActiveLinkProps } from "@/components/active-link/ActiveLink";
import { LoginButton } from "@/components/auth/LoginButton";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { useUIStore } from "@/store/index";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  IoCloseOutline,
  IoPeopleOutline,
  IoSearchOutline,
  IoTicketOutline,
} from "react-icons/io5";
import {
  MdInsertChartOutlined,
  MdOutlineDashboard,
  MdOutlinePerson,
  MdOutlineSettings,
  MdOutlineShoppingBag,
  MdOutlineStore,
} from "react-icons/md";
import { FaDolly, FaRegChartBar } from "react-icons/fa";
import { SlSettings } from "react-icons/sl";
import { LiaUsersCogSolid } from "react-icons/lia";

const accountNavItems: ActiveLinkProps[] = [
  {
    path: "/profile",
    label: "Profile",
    icon: <MdOutlinePerson className="w-6 h-6" />,
  },
  {
    path: "/orders",
    label: "Orders",
    icon: <IoTicketOutline className="w-6 h-6" />,
  },
];

const adminMenuItems: ActiveLinkProps[] = [
  {
    path: "/admin",
    label: "Dashboard",
    icon: <MdOutlineDashboard className="w-6 h-6" />,
  },
  {
    path: "/admin/products",
    label: "Products",
    icon: <MdOutlineStore className="w-6 h-6" />,
  },
  {
    path: "/admin/orders",
    label: "Orders",
    icon: <MdOutlineShoppingBag className="w-6 h-6" />,
  },
  {
    path: "/admin/users",
    label: "Users",
    icon: <LiaUsersCogSolid className="w-6 h-6" />,
  },
  {
    path: "/admin/reports",
    label: "Reports",
    icon: <FaRegChartBar className="w-6 h-6" />,
  },
  {
    path: "/admin/settings",
    label: "Settings",
    icon: <SlSettings className="w-6 h-6" />,
  },
];

export const SideMenu = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeSideMenu = useUIStore((state) => state.closeSideMenu);

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user?.role === "admin";

  return (
    <div>
      {/* bg black */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-30 z-30" />
      )}

      {/* bg blur */}
      {isSideMenuOpen && (
        <div
          onClick={closeSideMenu}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-40 backdrop-filter backdrop-blur-sm"
        />
      )}
      {/* TODO: slide effect */}
      <nav
        className={clsx(
          "ppbb-c-layout-side-menu fixed p-5 right-0 top-0 w-[300px] h-screen bg-white z-50 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={30}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => closeSideMenu()}
        />

        {/* search */}
        <div className="relative mt-10">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus-outline-none focus:border-primary"
          />
        </div>

        <div className="mt-6">
          {isAuthenticated &&
            accountNavItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="flex items-center px-2 py-1 text-text-secondary hover:text-primary hover:text-medium rounded transition-all text-sm md:text-base"
                onClick={() => closeSideMenu()}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Link>
            ))}

          {isAuthenticated && <LogoutButton />}

          {!isAuthenticated && <LoginButton />}
        </div>

        {isAdmin && (
          <>
            <div className="w-full h-px bg-gray-200 my-6" />

            <div className="mt-6">
              {adminMenuItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="flex items-center px-2 py-1 text-text-secondary hover:text-primary hover:text-medium rounded transition-all text-sm md:text-base"
                  onClick={() => closeSideMenu()}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Link>
              ))}
            </div>
          </>
        )}
      </nav>
    </div>
  );
};
