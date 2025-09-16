import type { IBusinessSettings } from "@/interfaces";
import { BusinessSettings } from "@prisma/client";

interface Props {
  settings: IBusinessSettings;
}

export const Footer = ({ settings }: Props) => {
  // console.log(settings);

  return (
    <div className="mt-auto flex items-center justify-center py-3">
      <p className="text-sm text-gray-500">
        <strong>{settings.businessName}</strong> &copy;{" "}
        {new Date().getFullYear()}. All rights reserved
      </p>
    </div>
  );
};
