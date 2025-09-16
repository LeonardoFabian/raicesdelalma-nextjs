import {
  MdOutlineMenu,
  MdOutlineSearch,
  MdOutlineNotifications,
  MdOutlineDashboard,
  MdOutlinePerson,
  MdOutlineSettings,
} from "react-icons/md";
import { Avatar } from "../../Avatar/Avatar";
import { ActiveLinkProps } from "@/components/active-link/ActiveLink";
import { LogoutButton } from "@/components/auth/LogoutButton";
// import { accountNavItems } from "@/auth";
import { IUser } from "@/interfaces";
import { ToggleSidebarButton } from "./toggle-sidebar-button/ToggleSidebarButton";
import { AccountButton } from "@/components/layout/account/AccountButton";

interface Props {
  user: IUser;
  // name?: string | null | undefined;
  // email?: string | null | undefined;
  // image?: string | null | undefined;
}

const accountNavItems: ActiveLinkProps[] = [
  {
    path: "/admin",
    label: "Admin",
    icon: <MdOutlineDashboard className="w-6 h-6" />,
  },
  {
    path: "/admin/profile",
    label: "Profile",
    icon: <MdOutlinePerson className="w-6 h-6" />,
  },
  {
    path: "/admin/settings",
    label: "Settings",
    icon: <MdOutlineSettings className="w-6 h-6" />,
  },
  {
    path: "/admin/logout",
    label: "Logout",
    children: (
      <LogoutButton className="text-text-secondary hover:text-primary group-hover:text-primary" />
    ),
  },
];

export const AdminNavbar = ({ user }: Props) => {
  // console.log({ user });

  return (
    <div className="sticky z-10 top-0 h-14 px-6 border-b border-gray-300 bg-white hover:cursor-pointer lg:py-2.5 flex items-center">
      <div className="w-full flex items-center justify-between space-x-4">
        <ToggleSidebarButton />

        <h5 hidden className="text-xl text-gray-600 font-medium lg:block">
          Titulo de la seccion
        </h5>

        <div className="flex-1"></div>
        <div className="flex items-center space-x-2">
          {/* TODO: Create search component */}
          {/* <div hidden className="md:block">
            <div className="relative flex items-center text-gray-400 focus-within:text-purple-400">
              <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                <MdOutlineSearch />
              </span>
              <input
                type="search"
                name="s"
                id="s"
                placeholder="Search..."
                className="w-full pl-14 pr-4 py-2.5"
              />
            </div>
          </div> */}

          {/* <button
            type="button"
            className="flex items-center justify-center w-10 h-10 rounded-xl  bg-gray-100 focus:bg-gray-100"
          >
            <MdOutlineSearch size={24} />
          </button> */}

          <button
            type="button"
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 focus:bg-gray-100"
          >
            <MdOutlineNotifications size={24} />
          </button>

          <AccountButton className="text-text-primary" />

          {/* <Avatar
            user={user}
            size={32}
            template="button"
            // menuItems={accountNavItems}
          /> */}
        </div>
      </div>
    </div>
  );
};
