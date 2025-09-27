// 'use client'

import { getCookie, hasCookie, setCookie } from "cookies-next";

/*
cookieCart
*/

export const getShoppingCartCookie = (): { [id: string]: number } => {
    
    if ( hasCookie( 'rdaCart' ) ) {
        const cookieCart = JSON.parse( getCookie( 'rdaCart' ) as string ?? '{}' );
        return cookieCart;
    }
    
    return {};
}


export const addToShoppingCartCookie = ( id: string, quantity?: number ) => {
    const cookieCart = getShoppingCartCookie();

    if ( cookieCart[id] ) {
        cookieCart[id] += quantity ?? 1;
    } else {
        cookieCart[id] = quantity ?? 1;
    }

    setCookie( 'rdaCart', JSON.stringify( cookieCart ) );
}

/**
 * Removes the product with given id from the shopping cart cookie.
 * If the product is not present in the cart, this function does nothing.
 * @param id The id of the product to remove from the cart.
 */
export const removeFromShoppingCartCookie = ( id: string ) => {
    const cookieCart = getShoppingCartCookie();
    if ( cookieCart[id] ) {
        delete cookieCart[id];
    }
    setCookie( 'rdaCart', JSON.stringify( cookieCart ) );

}

export const removeSingleItemFromCartCookie = ( id: string ) => {
    const cookieCart = getShoppingCartCookie();
    if (!cookieCart[id] ) return;

    const itemsInCart = cookieCart[id] - 1;

    if ( itemsInCart <= 0 ) {
        delete cookieCart[id];
    } else {
        cookieCart[id] = itemsInCart;
    }
    
    setCookie( 'rdaCart', JSON.stringify( cookieCart ) );
}