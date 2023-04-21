/* eslint-disable no-prototype-builtins */
import styled from 'styled-components';
import { Col, Row } from 'antd';
import React from 'react';
import { ProductionCategories } from '../../../enums/ProductionCategories';

const StyledRow = styled(Row)`
  .capacity {
    color: #767676;
  }
`;
export function Name({ sector }) {
  return (
    <StyledRow>
      <Col className="boldBody" span={24}>
        {ProductionCategories.hasOwnProperty(sector)
          ? ProductionCategories[sector]
          : sector}
      </Col>
      {/* <Col
        className="supportText capacity"
        span={24}
      >{`Capacité ${categoryCapacity}MW`}</Col> */}
    </StyledRow>
  );
}
