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

    const isOnTheWishlist = useAppSelector( state => !!state.wishlist.favorites[id] );
    const dispatch = useAppDispatch();

    const onToggle = () => {
        // console.log(`Toggle favorite product ${ id }`);
        dispatch( toggleFavorite( product ) );
    }

    return (
        <>
            <button 
                type="button" 
                className={`  rounded-full transition-all duration-300 ${ isOnTheWishlist ? ' text-primary' : ' text-text-primary' }`} 
                title={ isOnTheWishlist ? 'Remove from wishlist' : 'Add to wishlist' }
                onClick={ onToggle }
            >
                { isOnTheWishlist ? <MdOutlineFavorite size={size ?? 35} /> :    <MdOutlineFavoriteBorder size={size ?? 35} /> }
            </button>
        </>
    )
}