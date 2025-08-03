import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice';
import wishlistReducer from './wishlist/wishlist';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { localStorageMiddleware } from './middlewares/localstorage-middleware';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        wishlist: wishlistReducer,
    },

    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat( localStorageMiddleware ),

    // TODO: using localStorage in middleware
    // middleware: ( getDefaultMiddleware ) => getDefaultMiddleware({
    //     thunk: {
    //         extraArgument: localStorageMiddleware,
    //     },
    //     serializableCheck: false,
    // }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()


/*
    For @reduxjs/toolkit@1.9.5 react-redux@8.0.7 versions:
*/
// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;