import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import { groupByKey } from 'utils';

export const selectBilanItems = (state) => {
  return state.bilan.items;
};

export const selectBilanByProductionUnit = createSelector(
  [selectBilanItems],
  (items) => {
    return groupByKey(
      _.orderBy(items, 'productionUnit', 'asc'),
      'productionUnit',
    );
  },
);
