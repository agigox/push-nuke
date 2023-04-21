import { Col, Row } from 'antd';
import React from 'react';
import styled from '@emotion/styled';
import FOSSIL_GAS from 'images/sector-modal/fossil_gas-round.svg';
import FOSSIL_OIL from 'images/sector-modal/fossil_oil-round.svg';
import HYDRAULICS from 'images/sector-modal/hydraulics-round.svg';
import NUCLEAR from 'images/sector-modal/nuclear-round.svg';
import SOLAR from 'images/sector-modal/solar-round.svg';
import OFFSHORE from 'images/sector-modal/winds-round.svg';
import FOSSIL_HARD_COAL from 'images/sector-modal/fossil_hard_coal-round.svg';
import BIOMASS from 'images/sector-modal/biomass-round.svg';
import TIDAL from 'images/sector-modal/tidal.svg';
import { ProductionCategories } from 'enums/ProductionCategories';

const StyledRow = styled(Row)`
  margin-left: 10px;
  .biomass-color {
    color: black;
    border-radius: 0 0 3px 3px;
  }
  .fossil_gas-color {
    color: #f20809;
  }
  .fossil_hard_coal-color {
    color: #8c7a49;
  }
  .fossil_oil-color {
    color: #7a549f;
  }
  .hydraulics-color {
    color: #2672b0;
  }
  .nuclear-color {
    color: #ffc700;
    border-radius: 3px 3px 0 0;
  }
  .offshore-color {
    color: #39b593;
  }
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
export function RoundPercents({ categories }) {
  const pmax = categories.reduce((accumulator, currentValue) => {
    const pmaxValues = currentValue.values.reduce((accumul, current) => {
      return accumul + current.production.value;
    }, 0);
    return accumulator + pmaxValues;
  }, 0);
  return (
    <StyledRow>
      {categories.map(({ key, values }) => {
        const categoryProduction = values.reduce(
          (accumulator, currentValue) => {
            return accumulator + currentValue.production.value;
          },
          0,
        );
        return (
          <Col span={24} style={{ marginBottom: '22px' }} key={key}>
            <Row>
              <Col flex="28px" style={{ marginRight: '15px' }}>
                <img src={getIconBySector(key)} alt="icon" />
              </Col>
              <Col
                flex="100px"
                className={`boldBody ${key.toLowerCase()}-color`}
              >
                {ProductionCategories[key]}
              </Col>
              <Col
                className={`regularBody ${key.toLowerCase()}-color`}
              >{`${Math.round((categoryProduction * 100) / pmax)}%`}</Col>
            </Row>
          </Col>
        );
      })}
    </StyledRow>
  );
}
