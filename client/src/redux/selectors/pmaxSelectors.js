import { createSelector } from '@reduxjs/toolkit';
import { selectCurrentCategory } from './crossSelectors';

export const selectPmaxItems = (state) => {
  return [...state.pmax.items, { productionCategory: 'SOLAR', pmax: 61370 }];
};
export const selectPmaxCapacityByCategory = createSelector(
  [
    selectPmaxItems,
    (state, category) => {
      return category;
    },
  ],
  (pmaxItems, category) => {
    return pmaxItems.find((item) => {
      return item.productionCategory === category;
    }).pmax;
  },
);
export const selectPmaxCapacityCurrentCategory = createSelector(
  [selectPmaxItems, selectCurrentCategory],
  (pmaxItems, category) => {
    return pmaxItems.find((item) => {
      return item.productionCategory === category;
    }).pmax;
  },
);
