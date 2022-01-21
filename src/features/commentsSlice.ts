import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { Services } from 'services/s';

const CommentsService = new Services.Comments();

export const fetchUnreadCommentsSize = createAsyncThunk(
  'comments/fetchUnreadCommentsSize',
  async (fiscalYearId: string) => {
    const res = await CommentsService.getUnreadCount(fiscalYearId);

    return res.UnreadCount;
  }
);

export interface CommentsState {
  unread: number;
}

const initialState: CommentsState = {
  unread: 0,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setUnreadComments: (state, action: PayloadAction<number>) => {
      state.unread = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUnreadCommentsSize.fulfilled, (state, action) => {
      state.unread = action.payload;
    });
  },
});

export const { setUnreadComments } = commentsSlice.actions;
export default commentsSlice.reducer;
