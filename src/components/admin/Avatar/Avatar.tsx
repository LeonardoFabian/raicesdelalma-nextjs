"use client";

import { IUser } from "@/interfaces";
import { ProfilePicture } from "../../user/ProfilePicture";

interface Props {
  user: IUser;
  size?: number;
}

export const Avatar = ({ user, size }: Props) => {
  return (
    <>
      {user.image ? (
        <ProfilePicture
          className="rounded-full mx-auto"
          src={user.image}
          alt="Profile Picture"
          width={size}
          height={size}
        />
      ) : (
        <div
          className={`flex items-center ${
            size ? "" : "h-9 w-9 min-w-9"
          } justify-center rounded-full bg-link border-4 border-link overflow-hidden`}
          style={size ? { width: size, height: size } : {}}
        >
          <span
            className={`font-body ${
              size ? "" : "text-2xl"
            } font-semibold text-white`}
            style={size ? { fontSize: size / 2 } : {}}
          >
            {user.name?.charAt(0)}
          </span>
        </div>
      )}
    </>
  );
};
