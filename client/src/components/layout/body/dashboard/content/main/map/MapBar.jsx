/* eslint-disable no-unused-vars */
import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';
import { HEIGHT_MAP_BAR } from '../../../../../../../utils/constants';
import PieChartItem from './PieChartItem';

const StyledRow = styled(Row)`
  column-gap: 4px;
`;
function MapBar({
  productionUnitName,
  productionUnitPmax,
  unavailabilityUnitProduction,
  productionUnitProduction,
  currentCategory,
}) {
  const getBarPercent = (value) => {
    return Math.round((value * HEIGHT_MAP_BAR) / productionUnitPmax);
  };
  const unavailable = getBarPercent(unavailabilityUnitProduction);
  const prod = getBarPercent(productionUnitProduction);
  const available = productionUnitPmax - prod - unavailable;
  const data = [
    {
      name: 'Available',
      value:
        productionUnitPmax -
        unavailabilityUnitProduction -
        productionUnitProduction,
      color: '#0079D1',
    },
    {
      name: 'Unavailable',
      value: unavailabilityUnitProduction,
      color: '#D0574F',
    },
    { name: 'Prod', value: productionUnitProduction, color: '#41e03e' },
    // { name: 'Pmax', value: productionUnitPmax },
  ];
  return <PieChartItem data={data} productionUnitName={productionUnitName} />;
}

export default MapBar;
