"use client";

import { useState, useEffect } from "react";
// import { MdMenu, MdOutlineClose } from "react-icons/md";
// import { useAppSelector } from "@/store";
import { ActiveLink, ActiveLinkProps } from "../active-link/ActiveLink";
import { Logo } from "./Logo";
import { MenuMobile } from "./MenuMobile/MenuMobile";
// import { HeaderOptionsWrapper } from "./HeaderOptionsWrapper";
import { AccountButton, LoginButton } from "@/components";
import { NotificationBadge } from "@/components";
import { MdOutlineFavoriteBorder, MdOutlineShoppingBag } from "react-icons/md";

// import { cookies } from "next/headers";
import { FavoriteProductsCount } from "@/components/auth/getFavoriteProductsCount";
import { useCartStore } from "@/store";

export const Header = () => {
  const [loaded, setLoaded] = useState(false);
  // const [open, setOpen] = useState(false);
  // const cartCount = useAppSelector((state) => state.counter.count);
  // const wishlistCount = useAppSelector(
  //   (state) => Object.values(state.wishlist.favorites).length
  // );

  // const handleClick = () => {
  //   setOpen(!open);
  // };

  useEffect(() => {
    setLoaded(true);
  }, []);

  // const cookieStore = await cookies();
  // const cart = JSON.parse(cookieStore.get("ppbbCart")?.value ?? "{}") as {
  //   [id: string]: number;
  // };

  // const getShoppingCartTotalItems = () => {
  //   let items = 0;
  //   Object.values(cart).forEach((value) => {
  //     items += value as number;
  //   });
  //   return items.toString();
  // };

  const getTotalItemsInCart = useCartStore((state) => state.getTotalItems());

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
      path: "/contact",
      label: "Contact Us",
    },
  ];

  const accountLinks: ActiveLinkProps[] = [
    {
      path: "/favorites",
      icon: <MdOutlineFavoriteBorder className="w-6 h-6" />,
      badge: <FavoriteProductsCount />,
    },
    {
      path: +getTotalItemsInCart === 0 && loaded ? "/empty" : "/cart",
      icon: <MdOutlineShoppingBag className="w-6 h-6" />,
      badge: <NotificationBadge value={getTotalItemsInCart} />,
    },
  ];

  return (
    <>
      <nav className="fixed bg-white !text-primary flex items-center md:absolute w-full top-0 left-0 right-0 z-20 md:grid md:grid-cols-3 md:bg-transparent md:text-text-primary font-body py-2 px-3 md:px-6">
        <span className="hidden md:flex items-start">
          <ul className="flex items-center mt-4 space-x-6">
            {navItems.map((navItem) => (
              <ActiveLink key={navItem.path} {...navItem} />
            ))}
          </ul>
        </span>

        <span className="flex items-center justify-start md:justify-center !fill-white">
          <Logo
            theme="light"
            height={54}
            className={`text-white md:text-primary`}
          />
        </span>

        <ul className="flex items-center justify-end md:mt-2 space-x-3 md:space-x-6">
          {accountLinks.map((accountLink) => (
            <ActiveLink key={accountLink.path} {...accountLink} />
          ))}

          <div className="hidden md:flex">
            <AccountButton className="text-primary" />
          </div>
        </ul>

        {/* <button
          className="md:hidden text-text-primary absolute top-2 right-2 transition-all duration-300"
          onClick={handleClick}
          >
          {!open ? (
            <MdMenu className="w-8 h-8" />
            ) : (
              <MdOutlineClose className="w-8 h-8" />
              )}
              </button> */}
        <MenuMobile navItems={navItems} className="text-primary" />
      </nav>
    </>
  );
};
