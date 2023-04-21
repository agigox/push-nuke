import { Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import FOSSIL_GAS from 'images/sector-modal/fossil_gas.svg';
import FOSSIL_OIL from 'images/sector-modal/fossil_oil.svg';
import HYDRAULICS from 'images/sector-modal/hydraulics.svg';
import NUCLEAR from 'images/sector-modal/nuclear.svg';
import SOLAR from 'images/sector-modal/solar.svg';
import OFFSHORE from 'images/sector-modal/winds.svg';
import FOSSIL_HARD_COAL from 'images/sector-modal/fossil_hard_coal.svg';
import BIOMASS from 'images/sector-modal/biomass.svg';
import TIDAL from 'images/sector-modal/tidal.svg';

const StyledRow = styled(Row)`
  height: 30px;
  width: 30px;
`;
// eslint-disable-next-line consistent-return
const getIconBySector = (icon) => {
  switch (icon) {
    case 'FOSSIL_GAS':
      return FOSSIL_GAS;
    case 'FOSSIL_HARD_COAL':
      return FOSSIL_HARD_COAL;
    case 'FOSSIL_OIL':
      return FOSSIL_OIL;
    case 'HYDRAULICS':
      return HYDRAULICS;
    case 'NUCLEAR':
      return NUCLEAR;
    case 'SOLAR':
      return SOLAR;
    case 'OFFSHORE':
      return OFFSHORE;
    case 'BIOMASS':
      return BIOMASS;
    case 'TIDAL':
      return TIDAL;
    default:
  }
};

export function Image({ sector }) {
  return (
    <StyledRow>
      <img src={getIconBySector(sector)} alt="icon" />
    </StyledRow>
  );
}
