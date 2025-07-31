'use client'

import { useAppDispatch, useAppSelector } from "@/src/store";
import { addToWishlist, initializeWishlist, } from "@/src/store/counter/wishlistCounterSlice";
import { useEffect } from "react";
import { MdOutlineFavoriteBorder } from "react-icons/md";

interface Props {
    value?: number;
}

export const AddToWishlist = ({ value = 0 }: Props ) => {
    const count = useAppSelector( state => state.wishlist.count );
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch( initializeWishlist(value) );
    }, [dispatch, value]);

    return (
        <>
            <button 
                type="button" 
                className="bg-white border border-gray-500 text-text-primary p-2 rounded-full" 
                title="Add to Wishlist"
                onClick={() => dispatch( addToWishlist() )}
            >
                <MdOutlineFavoriteBorder size={24} />
            </button>
        </>
    )
}