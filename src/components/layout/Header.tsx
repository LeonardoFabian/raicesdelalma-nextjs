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
import { useCartStore, useWishlistStore } from "@/store";
import { useSession } from "next-auth/react";

export const Header = () => {
  const { data: session } = useSession();
  const getTotalItemsInCart = useCartStore((state) => state.getTotalItems());
  const wishlist = useWishlistStore((state) => state.wishlist);
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

  if (!loaded) return null;

  // const cookieStore = await cookies();
  // const cart = JSON.parse(cookieStore.get("rdaCart")?.value ?? "{}") as {
  //   [id: string]: number;
  // };

  // const getShoppingCartTotalItems = () => {
  //   let items = 0;
  //   Object.values(cart).forEach((value) => {
  //     items += value as number;
  //   });
  //   return items.toString();
  // };

  const navItems: ActiveLinkProps[] = [
    {
      path: "/about",
      label: "Sobre nosotros",
    },
    {
      path: "/shop",
      label: "Productos",
    },
    {
      path: "/contact",
      label: "Contáctanos",
    },
  ];

  const accountLinks: ActiveLinkProps[] = [
    {
      path: "/favorites",
      icon: <MdOutlineFavoriteBorder className="w-6 h-6" />,
      badge: <NotificationBadge value={wishlist.length} />,
      // badge: <FavoriteProductsCount />,
      title: "Favorites",
    },
    {
      path: +getTotalItemsInCart === 0 && loaded ? "/empty" : "/cart",
      icon: <MdOutlineShoppingBag className="w-6 h-6" />,
      badge: <NotificationBadge value={getTotalItemsInCart} />,
      title: "Cart",
    },
  ];

  return (
    <>
      <nav className="fixed bg-white !text-primary flex items-center md:absolute w-full top-0 left-0 right-0 z-20 md:grid md:grid-cols-3 md:bg-transparent md:text-text-primary font-body py-2 px-3 md:px-6">
        <span className="hidden md:flex items-start">
          <ul className="flex items-center mt-4 space-x-6">
            {navItems.map((navItem) => (
              <li key={navItem.path}>
                <ActiveLink {...navItem} />
              </li>
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
          {session?.user &&
            accountLinks.map((accountLink) => (
              <li key={accountLink.path}>
                <ActiveLink {...accountLink} />
              </li>
            ))}

          <li className="hidden md:flex">
            <AccountButton />
          </li>
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
