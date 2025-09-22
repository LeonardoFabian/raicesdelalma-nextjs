import { ActiveLinkProps } from "@/components/active-link/ActiveLink";
import { LogoutButton } from "../../components/auth/LogoutButton";

// TODO: Review if this file is still needed or can be deleted

export const accountNavItems: ActiveLinkProps[] = [
  {
    path: "/admin",
    label: "Admin",
  },
  {
    path: "/admin/account",
    label: "Account",
  },
  {
    path: "/admin/settings",
    label: "Settings",
  },

];
