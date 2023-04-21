import { createSlice } from '@reduxjs/toolkit';
import { ProductionCategoriesKeys } from 'enums/ProductionCategories';
import moment from 'moment';

const initialState = {
  itemsPerProductionUnit: [],
  itemsPerProductionType: [],
  error: {},
  lastRefreshHour: moment().format('DD/MM/YYYY - HH[h]mm'),
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    loadDataSuccess: (state, action) => {
      return {
        ...state,
        itemsPerProductionUnit: action.payload.itemsPerProductionUnit.items,
        itemsPerProductionType:
          action.payload.itemsPerProductionType.items.filter((item) => {
            return item.productionCategory !== ProductionCategoriesKeys.WASTE;
          }),
      };
    },
    loadDataFail: (state, action) => {
      return {
        ...state,
        error: action.payload.error,
      };
    },
  },
});

export const { loadDataSuccess, loadDataFail } = dataSlice.actions;

export default dataSlice.reducer;
