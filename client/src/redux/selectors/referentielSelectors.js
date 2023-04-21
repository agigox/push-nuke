import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import { groupByKey } from '../../utils';
import { selectCurrentCategory } from './crossSelectors';
import { selectPmaxItems } from './pmaxSelectors';

export const selectRefItems = (state) => {
  return state.referentiel.items;
};
export const selectReferentielByProductionCategory = createSelector(
  [selectRefItems, selectPmaxItems],
  (referentiel, pmaxs) => {
    console.log(pmaxs);
    const groupByCategory = groupByKey(referentiel, 'productionCategory');

    groupByCategory.unshift({ key: 'ALL', values: referentiel });
    const newData = groupByCategory.map((item) => {
      const { pmax } = pmaxs.find((item1) => {
        return item.key === item1.productionCategory;
      });
      return {
        ...item,
        pmax: parseInt(pmax, 10),
      };
    });
    return _.sortBy(newData, 'pmax').reverse();
  },
);
export const selectCategoryTotalUnits = createSelector(
  [selectReferentielByProductionCategory, selectCurrentCategory],
  (items, category) => {
    const result = items.find((item) => {
      return item.key === category;
    });
    if (_.isUndefined(result)) {
      return [];
    }
    return result.values.length;
  },
);
