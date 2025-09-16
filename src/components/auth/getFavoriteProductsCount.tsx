"use client";

import { useAppSelector } from "@/store/index-old";
import { NotificationBadge } from "../layout/badges/NotificationBadge";

export const FavoriteProductsCount = () => {
  const wishlistCount = useAppSelector(
    (state) => Object.values(state.wishlist.favorites).length
  );

  // const wishlistCount: number = 0;

  return <NotificationBadge value={wishlistCount} />;
};
