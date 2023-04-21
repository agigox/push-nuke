import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  error: {},
};
export const pmaxSlice = createSlice({
  name: 'pmax',
  initialState,
  reducers: {
    loadPmaxSuccess: (state, action) => {
      const { items } = action.payload;
      return { ...state, items };
    },
    loadPmaxFail: (state, action) => {
      return { ...state, error: action.payload.error };
    },
  },
});
export const { loadPmaxSuccess, loadPmaxFail } = pmaxSlice.actions;

export default pmaxSlice.reducer;
