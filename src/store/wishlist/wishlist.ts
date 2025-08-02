import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '@/src/products';

/*
    State shape
    {
        '1': { id: 1, title: 'Product 1' },
        '2': { id: 2, title: 'Product 2' },
        '3': { id: 3, title: 'Product 3' },
    }
*/

interface FavoriteProductsState {
    [key: string]: Product
}

const initialState: FavoriteProductsState = {
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleFavorite( state, action: PayloadAction<Product> ) {
        const product = action.payload;
        const { id } = product;

        if ( !!state[id] ) {
            delete state[id];
            return;
        } else {
            state[id] = product;
        }
    }
  }
});

export const { toggleFavorite} = productsSlice.actions

export default productsSlice.reducer