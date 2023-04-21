/* eslint-disable no-unused-vars */
import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';
import { HEIGHT_MAP_BAR } from '../../../../../../../utils/constants';

const StyledRow = styled(Row)`
  width: 159px;
  background: #ffffff;
  opacity: 0.8;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  padding: 5px;
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
`;
function BarIndication({ productionUnitName, productionUnitPmax, down, prod }) {
  return (
    <StyledRow className="bar-indication">
      <Col span={24} className="city">
        {productionUnitName.replace('SAINT-AVOLD-1', 'SAINT-AVOLD')}
      </Col>
      <Col span={24}>
        <Row wrap={false} className="percents" align="middle">
          <Col className="prod-percent">{`${Math.round(
            (prod * HEIGHT_MAP_BAR) / productionUnitPmax,
          )} %`}</Col>

          <Col className="separator-percent" />
          <Col className="down-percent">{`${
            HEIGHT_MAP_BAR -
            Math.round((down * HEIGHT_MAP_BAR) / productionUnitPmax) -
            Math.round((prod * HEIGHT_MAP_BAR) / productionUnitPmax)
          } %`}</Col>
        </Row>
      </Col>
      <Col span={24} className="pmax">
        {`Capacité ${Math.round(productionUnitPmax)}MW`}
      </Col>
    </StyledRow>
  );
}

export default BarIndication;
