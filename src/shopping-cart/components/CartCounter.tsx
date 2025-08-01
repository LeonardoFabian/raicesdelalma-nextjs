'use client'

import { useAppDispatch, useAppSelector } from "@/src/store";
import {  decrementCartItem, incrementCartItem, initializeCart,  } from "@/src/store/counter/counterSlice";
import { useEffect } from "react";
import { MdAdd, MdOutlineRemove } from "react-icons/md";

interface Props {
    value?: number;
}

export const CartCounter = ({ value = 0 }: Props ) => {
    
    const count = useAppSelector( state => state.counter.count );
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch( initializeCart(value) );
    }, [dispatch, value]);

    return (
        <>
            <span className="flex items-center">
                <button 
                    type="button" 
                    className="btn-decrement p-2 border border-gray-500" 
                    onClick={() => dispatch( decrementCartItem() )}
                >
                    <MdOutlineRemove size={24} />
                </button>
                    <span className="product-quantity py-2 w-12 text-center bg-gray-200 border border-gray-200">
                        { count }
                    </span>
                <button 
                    type="button" 
                    className="btn-increment p-2 border border-gray-500" 
                    onClick={() => dispatch( incrementCartItem() )}
                >
                    <MdAdd size={24} />
                </button>
            </span>

        </>
    )
}