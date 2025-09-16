import Link from "next/link";
import Image from "next/image";
import LogoDark from "../../../public/logo-header-dark.svg";
import LogoLight from "../../../public/logo-header-light.svg";
import { HomeIcon } from "@primer/octicons-react";
import { fontHeading } from "@/config/fonts";

interface Props {
  theme?: "light" | "dark";
  height?: number;
  className?: string;
}

export const Logo = ({ theme = "light", height, className }: Props) => {
  return (
    <Link href="/" className="flex items-center justify-start">
      {LogoDark || LogoLight ? (
        <Image
          src={
            theme === "dark" && className !== "text-white md:text-primary"
              ? LogoDark
              : LogoLight
          }
          className={`h-8 !md:h-[${height ? height + "px" : "8"}]`}
          alt="Logo"
          height={height ?? 32}
        />
      ) : (
        <span
          className={`${fontHeading.className} flex items-center space-x-2 font-bold`}
        >
          <HomeIcon />
          Home
        </span>
      )}
    </Link>
  );
};
