import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '@/src/products';

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
    favorites: { [key: string]: Product },
}

// const getInitialState = (): FavoriteProductsState => {

//     // if ( typeof localStorage === 'undefined') return {};

//     const favorites = JSON.parse( localStorage.getItem( 'my-purplebutterfly-wishlist' ) ?? '{}' );
//     return favorites;
// }

const initialState: FavoriteProductsState = {
    favorites: {},
    
    // ...getInitialState(),
    // '1': { id: 1, title: 'Product 1', thumbnail: 'https://dummyjson.com/image/i/products/1/thumbnail.jpg', price: 100, rating: 4.9, link: 'https://dummyjson.com/products/1' },
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {

    setFavoriteProducts( state, action: PayloadAction<{ [key: string]: Product }>) {
        state.favorites = action.payload;
    },

    toggleFavorite( state, action: PayloadAction<Product> ) {
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