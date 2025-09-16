import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product as ProductUI } from '@/interfaces';
// import { Product } from '@prisma/client';

/*
    State shape
    {
        '1': { id: 1, title: 'Product 1' },
        '2': { id: 2, title: 'Product 2' },
        '3': { id: 3, title: 'Product 3' },
    }

    new State 
    {
        favorites: {
            '1': { id: 1, title: 'Product 1' },
            '2': { id: 2, title: 'Product 2' },
            '3': { id: 3, title: 'Product 3' },
        }
    }
*/
interface FavoriteProductsState {
    favorites: { [key: string]: ProductUI },
}

// const getInitialState = (): FavoriteProductsState => {

//     // if ( typeof localStorage === 'undefined') return {};

//     const favorites = JSON.parse( localStorage.getItem( 'my-purplebutterfly-wishlist' ) ?? '{}' );
//     return favorites;
// }

const initialState: FavoriteProductsState = {
    favorites: {},
    
    // ...getInitialState(),
    // '1': { id: 1, title: 'Product 1', image: 'https://dummyjson.com/image/i/products/1/thumbnail.jpg', price: 100, rating: 4.9, link: 'https://dummyjson.com/products/1' },
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {

    setFavoriteProducts( state, action: PayloadAction<{ [key: string]: ProductUI }>) {
        state.favorites = action.payload;
    },

    toggleFavorite( state, action: PayloadAction<ProductUI> ) {
        const product = action.payload;
        const { id } = product;

        if ( !!state.favorites[id] ) {
            delete state.favorites[id];
            // return;
        } else {
            state.favorites[id] = product;
        }

        localStorage.setItem( 'my-purplebutterfly-wishlist', JSON.stringify( state.favorites ) );
    }
  }
});

export const { toggleFavorite, setFavoriteProducts } = productsSlice.actions

export default productsSlice.reducer