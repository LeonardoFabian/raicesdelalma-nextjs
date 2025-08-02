'use client'

import { useAppDispatch, useAppSelector } from "@/src/store";
import { useEffect } from "react";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { Product } from "../interfaces/product";
import { toggleFavorite } from "@/src/store/wishlist/wishlist";

interface Props {
    product: Product;
    size?: number;
}

export const AddToWishlist = ({ product, size }: Props ) => {

    const { id } = product;

    const isOnTheWishlist = useAppSelector( state => !!state.wishlist[id] );
    const dispatch = useAppDispatch();

    const onToggle = () => {
        console.log(`Toggle favorite product ${ id }`);
        dispatch( toggleFavorite( product ) );
    }

    return (
        <>
            <button 
                type="button" 
                className={` border p-1 rounded-full bg-white border-gray-500 transition-all duration-300 ${ isOnTheWishlist ? ' text-primary' : ' text-text-primary' }`} 
                title={ isOnTheWishlist ? 'Remove from wishlist' : 'Add to wishlist' }
                onClick={ onToggle }
            >
                { isOnTheWishlist ? <MdOutlineFavorite size={size ?? 32} /> :    <MdOutlineFavoriteBorder size={size ?? 32} /> }
            </button>
        </>
    )
}