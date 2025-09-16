"use client";

import { changeUserRole } from "@/actions";
import { Spinner } from "@/components";
import { IUser } from "@/interfaces";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Props {
  users: IUser[];
}

export const UsersTable = ({ users }: Props) => {
  const { data: session } = useSession();

  const userId = session ? session.user.id : "";

  const filteredUsers = users.filter((user) => user.id !== userId);

  return (
    <table className="min-w-full">
      <thead className="bg-white border-b border-b-gray-300">
        <tr>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Name
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Email
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Role
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Status
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Manage Role
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers && filteredUsers.length > 0
          ? filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="bg-white border-b border-b-gray-300 transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="text-sm md:text-base  text-text-primary  px-6 py-4 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="text-sm md:text-base  text-text-primary  px-6 py-4 whitespace-nowrap">
                  {user.email}
                </td>
                <td className="text-sm md:text-base  text-text-primary  px-6 py-4 whitespace-nowrap">
                  <strong>{user.role}</strong>
                </td>
                <td className="flex items-center text-sm md:text-base text-text-primary  px-6 py-4 whitespace-nowrap">
                  <span
                    className={clsx(
                      "px-2 rounded-lg text-sm font-semibold leading-5",
                      {
                        "bg-green-200 text-green-800": user.isActive,
                        "bg-red-200 text-red-800": !user.isActive,
                      }
                    )}
                  >
                    {user.isActive ? "active" : "inactive"}
                  </span>
                </td>
                <td className="text-sm md:text-base text-text-primary  px-6 ">
                  <select
                    className="text-sm text-text-primary cursor-pointer"
                    value={user.role}
                    onChange={(e) => changeUserRole(user.id, e.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="vendor">Vendor</option>
                    <option value="salesperson">Sales Person</option>
                    <option value="salesrep">Sales Rep.</option>
                    <option value="affiliate">Affiliate</option>
                    <option value="distributor">Distributor</option>
                    <option value="client">Client</option>
                  </select>
                </td>
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
};
