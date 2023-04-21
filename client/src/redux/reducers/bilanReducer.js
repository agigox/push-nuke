import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  error: {},
};
export const bilanSlice = createSlice({
  name: 'bilan',
  initialState,
  reducers: {
    loadBilanSuccess: (state, action) => {
      return { ...state, items: action.payload.items };
    },
    loadBilanFail: (state, action) => {
      return { ...state, error: action.payload.error };
    },
  },
});
export const { loadBilanSuccess, loadBilanFail } = bilanSlice.actions;

export default bilanSlice.reducer;
