/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import moment from 'moment-timezone';
import { referentiel } from '../data';
import { getRessource } from '../rteApi';
import { getProductionCategory } from '../utils/helpers';

const PRODUCTIONS_PER_UNIT_RESSOURCE =
  'actual_generation/v1/actual_generations_per_unit';
const PRODUCTIONS_PER_PRODUCTION_TYPE_RESSOURCE =
  'actual_generation/v1/actual_generations_per_production_type';
const UNAVAILABILITIES_RESSOURCE =
  'unavailability_additional_information/v4/generation_unavailabilities';

export const getData = async (input, { rteToken }) => {
  const now = moment().tz('Europe/Paris');
  const params = {
    start_date: moment(now).startOf('day').format(),
    end_date: moment(now).startOf('day').add(1, 'day').format(),
  };
  const params1 = {
    start_date: moment(now).startOf('day').subtract(4, 'days').format(),
    end_date: moment(now).startOf('day').format(),
  };

  const responseProdPerUnit = await getRessource({
    ressource: PRODUCTIONS_PER_UNIT_RESSOURCE,
    params,
    token: rteToken,
  });
  const responseProdPerProductionType = await getRessource({
    ressource: PRODUCTIONS_PER_PRODUCTION_TYPE_RESSOURCE,
    params: params1,
    token: rteToken,
  });
  const responseDispo = await getRessource({
    ressource: UNAVAILABILITIES_RESSOURCE,
    params: { ...params, status: 'ACTIVE', last_version: true },
    token: rteToken,
  });
  const itemsPerProductionType =
    responseProdPerProductionType.actual_generations_per_production_type.map(
      (item) => ({
        productionCategory: getProductionCategory(item.production_type),
        production: item.values.sort(
          (a, b) =>
            new Date(b.end_date).getTime() - new Date(a.end_date).getTime(),
        )[0],
      }),
    );
  const itemsPerProductionUnit = referentiel.map((item) => {
    const newItem = {
      ...item,
      productionCapacity: 0,
      unavailableCapacity: 0,
      bilan: {},
    };
    const production = responseProdPerUnit.actual_generations_per_unit.find(
      (elt) => elt.unit.eic_code === newItem.eicProd,
    );

    let unavailabilities = responseDispo.generation_unavailabilities.filter(
      (elt) =>
        [
          newItem.eicIndispoCentral,
          ...newItem.eicIndispoGroup.split(' '),
        ].includes(elt.unit.eic_code),
    );
    if (!_.isUndefined(production)) {
      const capacity = production.values.sort(
        (a, b) =>
          new Date(b.end_date).getTime() - new Date(a.end_date).getTime(),
      )[0].value;
      newItem.productionCapacity = capacity < 0 ? 0 : capacity;
    }

    if (unavailabilities.length >= 2) {
      const sorted = unavailabilities.sort(
        (a, b) => new Date(b.updated_date) - new Date(a.updated_date),
      );
      unavailabilities = _.uniqBy(sorted, 'unit.name');
    }
    newItem.unavailableCapacity = unavailabilities.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.values[0].unavailable_capacity,
      0,
    );
    newItem.availableCapacity = item.pmax - newItem.unavailableCapacity;
    newItem.pmax =
      item.pmax > newItem.productionCapacity
        ? item.pmax
        : newItem.productionCapacity;
    const {
      eicProd,
      eicIndispoCentral,
      eicIndispoGroup,
      productionType,
      reactorIndex,
      ...rest
    } = newItem;
    return {
      ...rest,
    };
  });
  return {
    itemsPerProductionUnit: {
      length: itemsPerProductionUnit.length,
      items: itemsPerProductionUnit,
    },
    itemsPerProductionType: {
      length: itemsPerProductionType.length,
      items: itemsPerProductionType,
    },
  };
};
