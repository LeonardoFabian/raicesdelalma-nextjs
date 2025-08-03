'use client';

import { useEffect, useState } from "react";
import { useAppSelector } from "@/src/store";
import { ProductGrid } from "./ProductGrid";
import { MdOutlineFavoriteBorder } from "react-icons/md";

export const FavoriteProducts = () => {

    const favoriteProducts = useAppSelector( state => Object.values( state.wishlist.favorites) );
    // const [products, setProducts] = useState( favoriteProducts );

    // console.log( products );
    // console.log( Object.values( products ) );

    // useEffect(() => {
    //     // setProducts( favoriteProducts );
    // }, [favoriteProducts]);

    return (
        <>
            { favoriteProducts.length === 0  ? <NoFavorites /> : <ProductGrid products={ favoriteProducts } /> }
        </>
            
    )
}

export const NoFavorites = () => {
  return (
    <div className="flex flex-col h-[50vh] items-center justify-center text-primary">
       <MdOutlineFavoriteBorder size={100} />
       <span>No Favorites Yet</span>
    </div>
  )
}