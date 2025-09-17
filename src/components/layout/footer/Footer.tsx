import { ActiveLinkProps } from "@/components/active-link/ActiveLink";
import { Logo } from "@/components/layout/Logo";
import { fontHeading } from "@/config/fonts";
import { Button } from "../button/Button";
import { IoLogoInstagram, IoLogoFacebook } from "react-icons/io5";
import Link from "next/link";
import { FooterLink } from "./ui/FooterLink";

export const Footer = () => {
  const navItems: ActiveLinkProps[] = [
    {
      path: "/about",
      label: "About Us",
    },
    {
      path: "/shop",
      label: "Shop",
    },
    {
      path: "/customize",
      label: "Customize",
    },
    {
      path: "/how-it-works",
      label: "How It Works",
    },
    {
      path: "/contact",
      label: "Contact Us",
    },
  ];
  const legalNavItems: ActiveLinkProps[] = [
    {
      path: "/legal/privacy-policy",
      label: "Privacy Policy",
    },
    {
      path: "/legal/refund-policy",
      label: "Refund Policy",
    },
    {
      path: "/legal/shipping-policy",
      label: "Shipping Policy",
    },
    {
      path: "/legal/ads-policy",
      label: "Ads Policy",
    },
    {
      path: "/legal/terms-and-conditions",
      label: "Terms and Conditions",
    },
  ];

  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white py-4">
      <div className="container py-8 flex flex-col md:flex-row gap-8 items-start justify-between">
        <div className="w-full justify-center flex flex-col md:justify-start md:gap-4">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Logo
              theme="dark"
              className="text-white text-center md:text-left"
              // height={100}
            />
          </div>
          <div className="flex flex-col text-center md:text-left gap-1">
            <p>Milford, DE</p>
            <p>info@purplebutterflybouquets.com</p>
          </div>
        </div>
        <div className="w-full flex flex-row items-start justify-between md:justify-start gap-4 md:gap-12">
          <div className="flex flex-col gap-3 justify-start">
            <h5 className={`${fontHeading.className} font-semibold text-2xl`}>
              Shop
            </h5>
            <div className="flex flex-col gap-1">
              {navItems.map((navItem) => (
                <FooterLink
                  key={navItem.path}
                  path={navItem.path}
                  label={navItem.label}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 justify-start">
            <h5 className={`${fontHeading.className} font-semibold text-2xl`}>
              Legal
            </h5>
            <div className="flex flex-col gap-1">
              {legalNavItems.map((navItem) => (
                <FooterLink
                  key={navItem.path}
                  path={navItem.path}
                  label={navItem.label}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-3 justify-center md:justify-start md:max-w-md">
          <h5
            className={`${fontHeading.className} font-semibold text-2xl text-center md:text-left`}
          >
            Subscribe
          </h5>
          <div className="flex flex-col gap-1">
            <p className="hover:text-gold-pastel text-center md:text-left">
              Subscribe to our newsletter
            </p>
            <form className="w-full flex flex-col lg:flex-row items-center justify-between gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white text-text-primary px-4 py-2 rounded-lg w-full"
              />
              <Button type="button" className="accent">
                Send
              </Button>
            </form>
          </div>
          <h5
            className={`${fontHeading.className} font-semibold text-2xl text-center md:text-left mt-4`}
          >
            Follow Us
          </h5>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <Link
              href="https://instagram.com/purplebutterflyde"
              className="hover:text-gold-pastel hover:cursor-pointer"
              target="_blank"
              title="Instagram"
            >
              <IoLogoInstagram size={30} />
            </Link>
            <Link
              href="#"
              className="hover:text-gold-pastel hover:cursor-pointer"
              target="_blank"
              title="Facebook"
            >
              <IoLogoFacebook size={30} />
            </Link>
          </div>
        </div>
      </div>
      <div className="container px-5 text-xs sm:text-sm text-center">
        <p>
          &copy; {`${year} Purple Butterfly Bouquets. All rights reserved.`}
        </p>
      </div>
    </footer>
  );
};
