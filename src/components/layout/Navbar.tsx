// "use server";
"use client";

// import { useState } from "react";
// import { MdMenu, MdOutlineClose } from "react-icons/md";
// import { useAppSelector } from "@/store";
import {
  ActiveLink,
  type ActiveLinkProps,
} from "@/components/active-link/ActiveLink";
import { Logo } from "./Logo";
import { MenuMobile } from "./MenuMobile/MenuMobile";
import { LoginButton } from "../auth/LoginButton";
// import { cookies } from "next/headers";
import { AccountButton, NotificationBadge } from "@/components";
import { MdOutlineFavoriteBorder, MdOutlineShoppingBag } from "react-icons/md";
import { FavoriteProductsCount } from "@/components/auth/getFavoriteProductsCount";
import { IoSearchOutline } from "react-icons/io5";
import { useCartStore, useWishlistStore } from "@/store";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export const Navbar = () => {
  const { data: session } = useSession();
  const getTotalItemsInCart = useCartStore((state) => state.getTotalItems());
  const wishlist = useWishlistStore((state) => state.wishlist);
  const [loaded, setLoaded] = useState(false);

  // const [open, setOpen] = useState(false);

  // const cartCount = useAppSelector((state) => state.counter.count);
  // const wishlistCount = useAppSelector(
  //   (state) => Object.values(state.wishlist.favorites).length
  // );

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  // const handleMenuButtonClick = () => {
  //   setOpen(!open);
  // };

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

  const accountLinks: ActiveLinkProps[] = [
    {
      path: "/search",
      icon: <IoSearchOutline className="w-6 h-6 hidden md:block" />,
    },
    {
      path: "/favorites",
      icon: <MdOutlineFavoriteBorder className="w-6 h-6" />,
      badge: <NotificationBadge value={wishlist.length} />,
      title: "Favorites",
    },
    {
      path: +getTotalItemsInCart === 0 && loaded ? "/empty" : "/cart",
      icon: <MdOutlineShoppingBag className="w-6 h-6" />,
      // badge: <NotificationBadge value={getShoppingCartTotalItems()} />,
      badge: <NotificationBadge value={+getTotalItemsInCart} />,
      title: "Cart",
    },
  ];

  return (
    <>
      <nav className="flex items-center justify-between bg-primary text-white font-body py-1 px-5 w-full">
        <Logo theme="dark" />

        {/* <div className="flex flex-1"></div> */}

        <ul className="hidden md:flex md:items-center space-x-6 mr-6">
          {navItems.map((navItem) => (
            <ActiveLink key={navItem.path} {...navItem} />
          ))}

          {/* <span className="hidden md:flex items-start justify-end">
            
          </span> */}
        </ul>

        <ul className="flex items-center space-x-1">
          {session?.user &&
            accountLinks.map((accountLink) => (
              <ActiveLink key={accountLink.path} {...accountLink} />
            ))}

          <div className="hidden md:flex">
            <AccountButton className="flex items-center gap-2 text-white bg-transparent hover:bg-white/10 cursor-pointer py-2 px-4 rounded-lg focus:outline-none focus:ring-none font-body font-semibold whitespace-nowrap" />
          </div>
          <MenuMobile navItems={navItems} />
        </ul>
      </nav>
    </>
  );
};
