import { Col, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';

const StyledRow = styled(Row)`
  width: 50px;
  .percent-1 {
    color: #37cb0f;
    width: 39px;
  }
`;
function Percents({ categoryLastProduction, categoryCapacity }) {
  const toPercent = (number) => {
    return Math.round((number * 100) / categoryCapacity);
  };
  return (
    <StyledRow align="middle">
      <Col className="boldBody percent-1">{`${toPercent(
        categoryLastProduction,
      )}%`}</Col>
    </StyledRow>
  );
}

export default Percents;
