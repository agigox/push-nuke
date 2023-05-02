import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  error: {},
};
export const referentielSlice = createSlice({
  name: 'referentiel',
  initialState,
  reducers: {
    loadReferentielSuccess: (state, action) => {
      return { ...state, items: action.payload };
    },
    loadReferentielFail: (state, action) => {
      return { ...state, error: action.payload.error };
    },
  },
});
export const { loadReferentielSuccess, loadReferentielFail } =
  referentielSlice.actions;

export default referentielSlice.reducer;
