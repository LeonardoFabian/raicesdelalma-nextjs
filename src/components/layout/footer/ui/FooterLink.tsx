"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export interface ActiveLinkProps {
  path: string;
  label?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  children?: React.ReactNode;
}

export const FooterLink = ({
  path,
  label,
  icon,
  badge,
  children,
}: ActiveLinkProps) => {
  const pathName = usePathname();

  return (
    <Link
      href={path}
      className={clsx(
        "px-2 py-2 flex items-center font-body space-x-2 rounded-md text-gray-300 hover:text-gray-100 group transition-all duration-300 hover:cursor-pointer",
        {
          "text-gold-pastel hover:text-gold-pastel": pathName === path,
        }
      )}
      title={label}
    >
      {children ? (
        children
      ) : (
        <span className="flex items-center gap-2 relative">
          {badge ?? ""}
          {icon ?? ""} {label}
        </span>
      )}
    </Link>
  );
};
