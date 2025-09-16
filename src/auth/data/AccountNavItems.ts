import { ActiveLinkProps } from "@/components/active-link/ActiveLink";
import { LogoutButton } from "../../components/auth/LogoutButton";

export const accountNavItems: ActiveLinkProps[] = [
  {
    path: "/admin",
    label: "Admin",
  },
  {
    path: "/admin/profile",
    label: "Profile",
  },
  {
    path: "/admin/settings",
    label: "Settings",
  },

];
