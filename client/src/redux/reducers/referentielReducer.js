import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  length: 0,
  items: [],
  error: {},
};
export const referentielSlice = createSlice({
  name: 'referentiel',
  initialState,
  reducers: {
    loadReferentielSuccess: (state, action) => {
      const { items } = action.payload;
      return { ...state, items, length: items.length };
    },
    loadReferentielFail: (state, action) => {
      return { ...state, error: action.payload.error };
    },
  },
});
export const { loadReferentielSuccess, loadReferentielFail } =
  referentielSlice.actions;

export default referentielSlice.reducer;
