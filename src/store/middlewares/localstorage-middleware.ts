import { Action, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { RootState } from "../index-old";

export const localStorageMiddleware = ( state: MiddlewareAPI) => {
    return ( next: Dispatch ) => ( action: Action ) => {

        next(action);
        // console.log({ action });

        if ( action.type === 'wishlist/toggleFavorite' ) {
            const { counter, wishlist} = state.getState() as RootState;
            localStorage.setItem( 'my-raicesdelalma-wishlist', JSON.stringify( wishlist ));
            return;
        }

        // console.log({ state });
        // console.log({ state: state.getState()});
    }
}