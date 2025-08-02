'use client';

import { useAppSelector } from "@/src/store";
import { ProductGrid } from "./ProductGrid";

export const FavoriteProducts = () => {

    const products = useAppSelector( state => Object.values( state.wishlist) );

    console.log( products );
    console.log( Object.values( products ) );

    return (
        <>
            <ProductGrid products={ products } />
        </>
    )
}