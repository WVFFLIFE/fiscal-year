import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BalanceState {
  activeRowId: string | null;
  prevRowId: string | null;
}

const initialState: BalanceState = {
  activeRowId: null,
  prevRowId: null,
};

export const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    setPrevRowId: (state, action: PayloadAction<string | null>) => {
      state.prevRowId = action.payload;
    },
    setActiveRowId: (state, action: PayloadAction<string | null>) => {
      state.prevRowId = state.activeRowId;
      state.activeRowId = action.payload;
    },
    reset: (state) => {
      state.activeRowId = null;
      state.prevRowId = null;
    },
  },
});

export const { setActiveRowId, setPrevRowId, reset } = balanceSlice.actions;
export default balanceSlice.reducer;
