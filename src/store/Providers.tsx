"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./index-old";
import { setFavoriteProducts } from "./wishlist/wishlist";

interface Props {
  children: React.ReactNode;
}

export const StoreProviders = ({ children }: Props) => {
  useEffect(() => {
    const favorites = JSON.parse(
      localStorage.getItem("my-purplebutterfly-wishlist") ?? "{}"
    );
    // console.log({ favorites });
    store.dispatch(setFavoriteProducts(favorites));
  }, []);

  return <Provider store={store}>{children}</Provider>;
};
