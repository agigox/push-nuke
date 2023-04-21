import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import { groupByKey } from '../../utils';
import { selectBilanByProductionUnit } from './bilanSelectors';
import { selectCurrentCategory } from './crossSelectors';
import { selectPmaxItems } from './pmaxSelectors';

export const selectLastRefreshHour = (state) => {
  return state.data.lastRefreshHour;
};
export const selectItemsPerProductionUnit = (state) => {
  return state.data.itemsPerProductionUnit;
};
const selectItemsPerProductionType = (state) => {
  return state.data.itemsPerProductionType;
};
export const selectPerUnitByProductionCategory = createSelector(
  [selectItemsPerProductionUnit, selectBilanByProductionUnit],
  (items, bilan) => {
    const newBilan = bilan.map((item) => {
      const value = item.values[0];
      return {
        unitName: item.key,
        productionUnit: item.key,
        groupedByField: item.key,
        pmax: value.pmax,
        productionCapacity: value.productionCapacity,
        productionCategory: 'HYDRAULICS',
        unavailableCapacity: 0,
        regroupementHydro: value.regroupementHydro,
      };
    });
    const newItems = [...items, ...newBilan];
    const dataByCategory = groupByKey(newItems, 'productionCategory');
    dataByCategory.unshift({ key: 'ALL', values: newItems });

    return dataByCategory;
  },
);
export const selectPerTypeByProductionCategory = createSelector(
  [selectItemsPerProductionType, selectPmaxItems],
  (items, pmaxs) => {
    const dataByCategory = groupByKey(items, 'productionCategory');

    const newData = dataByCategory.map((item) => {
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

export const selectPerUnitByProductionCategoryAndProductionUnit =
  createSelector(
    [
      selectPerUnitByProductionCategory,
      (state, category) => {
        return category;
      },
    ],
    (items, category) => {
      const { key, values } = items.find((item) => {
        return item.key === category;
      });

      return {
        key,
        values: groupByKey(
          _.orderBy(values, 'productionUnit', 'asc'),
          'productionUnit',
        ),
      };
    },
  );
export const selectPerUnitByFieldAndProductionUnit = createSelector(
  [
    selectPerUnitByProductionCategory,
    (state, category) => {
      return category;
    },
  ],
  (items, category) => {
    const { key, values } = items.find((item) => {
      return item.key === category;
    });
    return {
      key,
      values: groupByKey(
        _.orderBy(values, 'productionUnit', 'asc'),
        'groupedByField',
      ),
    };
  },
);
export const selectPerUnitByProductionCategoryAndRegroupementHydro =
  createSelector(
    [
      selectPerUnitByProductionCategory,
      (state, category) => {
        return category;
      },
    ],
    (items, category) => {
      const { key, values } = items.find((item) => {
        return item.key === category;
      });
      const a = _.orderBy(
        groupByKey(values, 'regroupementHydro'),
        'key',
        'asc',
      );
      const b = a.map((item) => {
        return {
          key: item.key,
          values: groupByKey(item.values, 'productionUnit'),
        };
      });
      return {
        key,
        values: b,
      };
    },
  );

const selectCategoryUnavailabilities = createSelector(
  [selectPerUnitByProductionCategory, selectCurrentCategory],
  (items, category) => {
    return items.find((item) => {
      return item.key === category;
    }).values;
  },
);
export const selectCatgoryFullyDownUnavailabilityNumber = createSelector(
  [selectCategoryUnavailabilities],
  (unavailabilities) => {
    return unavailabilities.filter((u) => {
      return u.availableCapacity === 0;
    }).length;
  },
);
export const selectCatgoryPartiallyDownUnavailabilityNumber = createSelector(
  [selectCategoryUnavailabilities],
  (unavailabilities) => {
    return unavailabilities.filter((u) => {
      return u.pmax !== u.unavailableCapacity && u.pmax !== u.availableCapacity;
    }).length;
  },
);

export const selectCurrentUnavailable = createSelector(
  [selectPerUnitByProductionCategory, selectCurrentCategory],
  (groupedReferentiel, currentCategory) => {
    const currentRef = groupedReferentiel.find((item) => {
      return item.key === currentCategory;
    });
    const unavailable = currentRef.values.reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue.unavailableCapacity;
      },
      0,
    );
    const available = currentRef.values.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.availableCapacity;
    }, 0);
    return { unavailable, available };
  },
);
export const selectCurrentProduction = createSelector(
  [selectPerTypeByProductionCategory, selectCurrentCategory],
  (items, currentCategory) => {
    const currentProd = items.find((item) => {
      return item.key === currentCategory;
    });
    if (_.isUndefined(currentProd)) {
      return 0;
    }
    const production = currentProd.values.reduce(
      (accumulator, currentValue) => {
        const prodValue =
          currentValue.production.value >= 0
            ? currentValue.production.value
            : 0;
        return accumulator + prodValue;
      },
      0,
    );
    return production;
  },
);

export const selectProductionByCategory = createSelector(
  [
    selectPerTypeByProductionCategory,
    (state, category) => {
      return category;
    },
  ],
  (items, category) => {
    const currentProd = items.find((item) => {
      return item.key === category;
    });
    if (_.isUndefined(currentProd)) {
      return 0;
    }
    const production = currentProd.values.reduce(
      (accumulator, currentValue) => {
        const prodValue =
          currentValue.production.value >= 0
            ? currentValue.production.value
            : 0;
        return accumulator + prodValue;
      },
      0,
    );
    return production;
  },
);
