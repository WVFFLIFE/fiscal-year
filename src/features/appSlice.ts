import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  defaultFiscalYearId: string | null;
  defaultCooperativeId: string | null;
}

const initialState: AppState = {
  defaultCooperativeId: null,
  defaultFiscalYearId: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setDefaultCooperativeId: (state, action: PayloadAction<string | null>) => {
      state.defaultCooperativeId = action.payload;
    },
    setDefaultFiscalYearId: (state, action: PayloadAction<string | null>) => {
      state.defaultFiscalYearId = action.payload;
    },
    resetDefaultIds: (state) => {
      state.defaultCooperativeId = null;
      state.defaultFiscalYearId = null;
    },
  },
});

export const {
  setDefaultCooperativeId,
  setDefaultFiscalYearId,
  resetDefaultIds,
} = appSlice.actions;
export default appSlice.reducer;
