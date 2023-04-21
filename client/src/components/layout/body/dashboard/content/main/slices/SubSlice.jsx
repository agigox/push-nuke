import { Col, Row } from 'antd';
import React from 'react';
import styled from '@emotion/styled';
import SubSliceTitle from './SubSliceTitle';

const StyledRow = styled(Row)`
  width: 86px;
  .slice-content-col {
    color: white;
  }
`;

function SubSlice({ unitName, pmax, production, available }) {
  const getClassName = () => {
    const limit = (1 / 10) * (production + available);
    if (available === 0) {
      return 'fully-slice-red';
    }
    if (production <= 0 || production <= limit) {
      return 'prod-sub-slice-blue';
    }
    if (available - production <= 20 || available < limit) {
      // Pas d'indispo
      return 'up-slice-green';
    }
    return 'hashed-slice';
  };
  return (
    <StyledRow className="slice-content">
      <Col span={24}>
        <SubSliceTitle pmax={pmax} isIconVisible={pmax !== available} />
      </Col>
      <Col span={24} className={`slice-content-col ${getClassName()}`}>
        <Row>
          <Col span={24} className="slice-content-capacity">
            {Math.round(production)} <span>MW</span>
          </Col>
          <Col className="slice-content-city" span={24}>
            {unitName}
          </Col>
        </Row>
      </Col>
    </StyledRow>
  );
}

export default SubSlice;
