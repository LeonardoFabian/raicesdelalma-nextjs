'use client';

import { useWishlistStore } from "@/store";
import { useEffect } from "react";

type Props = {
    initialState: string[];
}

export const HydrateZustandWishlist = ({ initialState }: Props ) => {
    const setItems = useWishlistStore((state) => state.setItems);

    useEffect(() => {
        setItems(initialState);
    }, [initialState, setItems]);

    return null;
}