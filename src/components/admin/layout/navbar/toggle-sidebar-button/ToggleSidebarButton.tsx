"use client";

import { useUIStore } from "@/store";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineMenu } from "react-icons/md";

export const ToggleSidebarButton = () => {
  const isOpen = useUIStore((state) => state.isAdminSidebarOpen);
  const openSidebarMenu = useUIStore((state) => state.openAdminSidebar);
  const closeSidebarMenu = useUIStore((state) => state.closeAdminSidebar);

  return (
    <button
      onClick={isOpen ? closeSidebarMenu : openSidebarMenu}
      type="button"
      className="w-12 h-16 -mr-2 cursor-pointer"
    >
      {isOpen ? (
        <IoCloseOutline className="w-8 h-8 text-text-primary" />
      ) : (
        <MdOutlineMenu className="w-8 h-8 text-text-primary" />
      )}
    </button>
  );
};
