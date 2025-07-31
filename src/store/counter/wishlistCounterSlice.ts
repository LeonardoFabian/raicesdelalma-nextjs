import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface WishlistCounterState {
    count: number;
    isReady: boolean;
}

const initialState = {
    count: 0,
    isReady: false,
}

const wishlistCounterSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    initializeWishlist( state, action: PayloadAction<number>) {
        if (state.isReady) return;
        state.count = action.payload;
        state.isReady = true;
    },
    addToWishlist(state) {
        console.log('adding to wishlist...');
    },
    removeFromWishlist(state) {
        console.log('removing from wishlist...');
    },
  }
});

export const { initializeWishlist, addToWishlist, removeFromWishlist } = wishlistCounterSlice.actions

export default wishlistCounterSlice.reducer