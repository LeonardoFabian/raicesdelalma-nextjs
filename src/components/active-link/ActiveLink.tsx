"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export interface ActiveLinkProps {
  path: string;
  label?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const ActiveLink = ({
  path,
  label,
  icon,
  badge,
  children,
  className = "text-gold-pastel",
}: ActiveLinkProps) => {
  const pathName = usePathname();

  return (
    <Link
      href={path}
      className={`px-2 py-2 flex items-center font-body space-x-2 rounded-md  group transition-all duration-300 hover:cursor-pointer ${
        pathName === path ? className : ""
      } ${pathName !== "/" ? `hover:${className}` : "hover:text-primary"}`}
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
