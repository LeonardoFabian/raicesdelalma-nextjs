"use client";

import { JSX, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MdOutlineDashboard,
  MdOutlineStore,
  MdOutlineShoppingBag,
  MdOutlineSettings,
  MdInsertChartOutlined,
  MdLogout,
  MdOutlinePersonSearch,
} from "react-icons/md";
import { SidebarMenuItem } from "../sidebar-menu-item/SidebarMenuItem";
import Logo from "../../../../public/logo-header-dark.svg";
import { Avatar } from "../Avatar/Avatar";
import { LogoutButton } from "@/components/auth/LogoutButton";
// import { IUser } from "@/interfaces";
import { User } from "@prisma/client";
import { useUIStore } from "@/store";
import clsx from "clsx";
import { IoCloseOutline } from "react-icons/io5";
import { IUser } from "@/interfaces";

interface Props {
  user: IUser;
}

interface MenuItemsProps {
  path: string;
  label: string;
  description?: string;
  icon: JSX.Element;
  includeChildren?: boolean;
}

const menuItems: MenuItemsProps[] = [
  {
    path: "/admin",
    label: "Admin",
    description: "View your dashboard",
    icon: <MdOutlineDashboard className="w-6 h-6" />,
    includeChildren: false,
  },
  {
    path: "/admin/products",
    label: "Products",
    description: "Manage your products",
    icon: <MdOutlineStore className="w-6 h-6" />,
  },
  {
    path: "/admin/orders",
    label: "Orders",
    description: "Manage user orders",
    icon: <MdOutlineShoppingBag className="w-6 h-6" />,
  },
  {
    path: "/admin/users",
    label: "Users",
    description: "Manage users and roles",
    icon: <MdOutlinePersonSearch className="w-6 h-6" />,
  },
  {
    path: "/admin/reports",
    label: "Reports",
    description: "View your reports",
    icon: <MdInsertChartOutlined className="w-6 h-6" />,
  },
  {
    path: "/admin/settings",
    label: "Settings",
    description: "Manage settings",
    icon: <MdOutlineSettings className="w-6 h-6" />,
  },
];

export const Sidebar = ({ user }: Props) => {
  const [open, setOpen] = useState(true);
  const isSidebarOpen = useUIStore((state) => state.isAdminSidebarOpen);
  const closeSidebarMenu = useUIStore((state) => state.closeAdminSidebar);

  if (!open) return null;

  return (
    <>
      {/* bg black */}
      {isSidebarOpen && (
        <div className="fixed lg:hidden top-0 left-0 w-screen h-screen bg-black opacity-30 z-30" />
      )}

      {/* bg blur */}
      {isSidebarOpen && (
        <div
          onClick={closeSidebarMenu}
          className="fade-in fixed lg:hidden top-0 left-0 w-screen h-screen z-40 backdrop-filter backdrop-blur-sm"
        />
      )}

      <aside
        id="menu"
        className={clsx(
          "absolute lg:relative top-0 bottom-0 z-50 lg:z-10 bg-primary-dark min-h-screen text-slate-300 left-0  transform transition-all duration-300 ease-in-out",
          {
            "-translate-x-full w-[0px]": !isSidebarOpen,
            "translate-x-0 w-[300px] lg:w-[350px]": isSidebarOpen,
          }
        )}
      >
        <div
          className={clsx(
            "fade-in h-screen max-h-screen flex-col justify-between",
            {
              hidden: !isSidebarOpen,
              flex: isSidebarOpen,
            }
          )}
        >
          <div
            id="logo"
            className="my-4 px-6 flex items-start lg:items-center justify-between lg:justify-center"
          >
            <Link href="/">
              <Image src={Logo} alt="Logo" height={32} />
            </Link>
            <IoCloseOutline onClick={closeSidebarMenu} className="w-8 h-8" />
          </div>
          <div id="profile" className="px-6 py-6">
            <p className="text-sm font-medium  text-accent text-center">
              Welcome back,
            </p>
            <Avatar
              user={user}
              menuItems={[]}
              size={54}
              className="text-white"
              template="card"
            />
          </div>
          <div id="nav" className="w-full px-6">
            {menuItems.map((menuItem) => (
              <SidebarMenuItem key={menuItem.path} {...menuItem} />
            ))}
          </div>

          <div className="px-6 mt-auto flex justify-between items-center ">
            <LogoutButton />
          </div>
        </div>
      </aside>
    </>
  );
};
