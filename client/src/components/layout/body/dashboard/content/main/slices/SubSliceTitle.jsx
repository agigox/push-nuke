import { Col, Row } from 'antd';
import React from 'react';
import styled from '@emotion/styled';
import { formatNumberToFr } from '../../../../../../../utils';
import Travaux from '../../../../../../../images/construction.svg';

const CustomRow = styled(Row)`
  flex-direction: row-reverse;
  height: 15px;
  .icon {
    order: 1;
    position: relative;
    bottom: 2px;
  }
`;
function SubSliceTitle({ pmax, isIconVisible }) {
  return (
    <CustomRow justify="space-between" wrap={false} align="middle">
      {isIconVisible && (
        <Col className="icon">
          <img src={Travaux} alt="construction" />
        </Col>
      )}

      <Col className="slice-content-pmax">{`Pmax ${formatNumberToFr(
        pmax,
      )}MW`}</Col>
    </CustomRow>
  );
}

export default SubSliceTitle;
