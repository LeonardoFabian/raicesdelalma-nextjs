import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
  reducer: {
    counterReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;