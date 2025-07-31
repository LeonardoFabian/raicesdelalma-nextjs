import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
    count: number;
    isReady: boolean;
}

const initialState: CounterState = {
    count: 0,
    isReady: false,
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    initializeCart(state, action: PayloadAction<number>) {
        if (state.isReady) return;
        state.count = action.payload;
        state.isReady = true;
    },
    incrementCartItem(state) {
        state.count++;
    },
    decrementCartItem(state) {
        if ( state.count === 0 ) return;
        state.count--;
    },
    resetCart( state, action: PayloadAction<number> ) {
        if ( state.count < 0 ) action.payload = 0;
        state.count = action.payload;
    }

}
});

export const { initializeCart, incrementCartItem, decrementCartItem, resetCart } = counterSlice.actions;

export default counterSlice.reducer;