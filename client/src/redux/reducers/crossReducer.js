import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  displayMode: 'MAP',
  currentCategory: 'ALL',
};

export const crossSlice = createSlice({
  name: 'cross',
  initialState,
  reducers: {
    changeDisplayMode: (state, action) => {
      return { ...state, displayMode: action.payload };
    },
    changeCurrentCategory: (state, action) => {
      return { ...state, currentCategory: action.payload };
    },
  },
});

export const { changeDisplayMode, changeCurrentCategory } = crossSlice.actions;

export default crossSlice.reducer;
