import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
    count: number;
}

const initialState: CounterState = {
    count: 5
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
        state.count++;
    },
    decrement(state) {
        if ( state.count === 0 ) return;
        state.count--;
    },
    reset( state, action: PayloadAction<number> ) {
        if ( state.count < 0 ) action.payload = 0;
        state.count = action.payload;
    }

}
});

export const { increment, decrement, reset } = counterSlice.actions;

export default counterSlice.reducer;