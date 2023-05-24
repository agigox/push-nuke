import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';
import FOSSIL_GAS from 'images/sector-modal/fossil_gas.svg';
import FOSSIL_OIL from 'images/sector-modal/fossil_oil.svg';
import HYDRAULICS from 'images/sector-modal/hydraulics.svg';
import NUCLEAR from 'images/sector-modal/nuclear.svg';
import SOLAR from 'images/sector-modal/solar.svg';
import OFFSHORE from 'images/sector-modal/winds.svg';
import FOSSIL_HARD_COAL from 'images/sector-modal/fossil_hard_coal.svg';
import BIOMASS from 'images/sector-modal/biomass.svg';
import TIDAL from 'images/sector-modal/tidal.svg';
import { HEIGHT_MAP_BAR } from '../../../../../../../utils/constants';

const StyledRow = styled(Row)`
  flex-wrap: nowrap;
  align-items: center;
  width: 193px;
  background: #ffffff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  padding: 10px;
  text-align: left;
  .percents {
    column-gap: 7px;
    .separator-percent {
      width: 4px;
      height: 4px;
      border-radius: 2px;
      background: #767676;
    }
  }
  .bar-image {
    padding-right: 10px;
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
function BarIndication({
  productionUnitName,
  productionUnitPmax,
  down,
  prod,
  productionCategory,
}) {
  const a = Math.round((down * HEIGHT_MAP_BAR) / productionUnitPmax);
  const b = Math.round((prod * HEIGHT_MAP_BAR) / productionUnitPmax);
  return (
    <StyledRow className="bar-indication">
      <Col className="bar-image">
        <img src={getIconBySector(productionCategory)} alt="icon" />
      </Col>

      <Col>
        <Row>
          <Col span={24} className="city">
            {productionUnitName.replace('SAINT-AVOLD-1', 'SAINT-AVOLD')}
          </Col>
          <Col span={24}>
            <Row wrap={false} className="percents" align="middle">
              <Col className="prod-percent">{`${b <= 100 ? b : 100} %`}</Col>

              <Col className="separator-percent" />
              <Col className="down-percent">{`${
                HEIGHT_MAP_BAR - a - b >= 0 ? HEIGHT_MAP_BAR - a - b : 0
              } %`}</Col>
            </Row>
          </Col>
          <Col span={24} className="pmax">
            Production
            <span className="prod-value">{` ${Math.round(prod)}MW`}</span>
          </Col>
          <Col span={24} className="pmax">
            {`Capacité ${Math.round(productionUnitPmax)}MW`}
          </Col>
        </Row>
      </Col>
    </StyledRow>
  );
}

export default BarIndication;
