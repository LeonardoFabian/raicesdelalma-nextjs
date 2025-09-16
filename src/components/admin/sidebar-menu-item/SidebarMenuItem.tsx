"use client";

import { JSX } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/store";

interface Props {
  path: string;
  label: string;
  description?: string;
  icon: JSX.Element;
  includeChildren?: boolean;
}

export const SidebarMenuItem = ({
  path,
  label,
  description,
  icon,
  includeChildren = true,
}: Props) => {
  const currentPath = usePathname();
  const closeSidebarMenu = useUIStore((state) => state.closeAdminSidebar);

  const normalize = (p: string) =>
    p.endsWith("/") && p !== "/" ? p.slice(0, -1) : p;
  const cur = normalize(currentPath);
  const tgt = normalize(path);

  const isActive =
    cur === tgt || (includeChildren && cur.startsWith(tgt + "/"));

  return (
    <>
      <Link
        href={path}
        className={`w-full px-2 hidden lg:inline-flex space-x-4 items-center border-b border-accent py-2 ${
          isActive ? "text-white bg-white/10" : "text-accent"
        } hover:bg-white/5 transition ease-linear duration-150`}
      >
        <div>{icon}</div>
        <div className="flex flex-col">
          <span
            className={`text-md font-medium leading-4 ${
              currentPath === path ? "text-white" : "text-accent"
            }`}
          >
            {label}
          </span>
          {description && (
            <span className="text-sm text-white/50 hidden md:block">
              {description}
            </span>
          )}
        </div>
      </Link>

      <Link
        href={path}
        className={`w-full px-2 inline-flex lg:hidden space-x-4 items-center border-b border-accent py-2 ${
          isActive ? "text-white bg-white/10" : "text-accent"
        } hover:bg-white/5 transition ease-linear duration-150`}
        onClick={closeSidebarMenu}
      >
        <div>{icon}</div>
        <div className="flex flex-col">
          <span
            className={`text-md font-medium leading-4 ${
              currentPath === path ? "text-white" : "text-accent"
            }`}
          >
            {label}
          </span>
          {description && (
            <span className="text-sm text-white/50 hidden md:block">
              {description}
            </span>
          )}
        </div>
      </Link>
    </>
  );
};
