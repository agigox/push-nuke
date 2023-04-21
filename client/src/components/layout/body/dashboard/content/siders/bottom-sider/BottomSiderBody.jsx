import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectCatgoryFullyDownUnavailabilityNumber,
  selectCatgoryPartiallyDownUnavailabilityNumber,
} from '../../../../../../../redux/selectors/dataSelectors';
import { selectCategoryTotalUnits } from '../../../../../../../redux/selectors/referentielSelectors';

const StyledRow = styled(Row)`
  flex-direction: row;
  .bottom-sider-bottom-row {
    height: 48px;
    width: 233px;
    column-gap: 16px;
    align-items: center;
  }
  .separator {
    width: 222px;
    height: 0px;
    border: 1px solid #e8e8e8;
    margin-bottom: 39px;
  }
`;
function BottomSiderBody() {
  const currentFullyDownNumber = useSelector(
    selectCatgoryFullyDownUnavailabilityNumber,
  );
  const currentPartiallyDownNumber = useSelector(
    selectCatgoryPartiallyDownUnavailabilityNumber,
  );
  const currentTotal = useSelector(selectCategoryTotalUnits);

  return (
    <StyledRow className="bottom-sider-body">
      <Col className="total-col" span={24}>
        Total : {currentTotal}
      </Col>

      <Col className="separator" />

      <Col span={24}>
        <Row
          justify="space-between"
          wrap={false}
          className="bottom-sider-bottom-row"
        >
          <Col className="text-1">En fonctionnement</Col>
          <Col className="text-2">
            {currentTotal - currentPartiallyDownNumber - currentFullyDownNumber}
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row
          justify="space-between"
          wrap={false}
          className="bottom-sider-bottom-row"
        >
          <Col className="text-1">En fonctionnement partiel</Col>
          <Col className="text-2">{currentPartiallyDownNumber}</Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row
          justify="space-between"
          wrap={false}
          className="bottom-sider-bottom-row"
        >
          <Col className="text-1">En arrêt complet</Col>
          <Col className="text-2">{currentFullyDownNumber}</Col>
        </Row>
      </Col>
    </StyledRow>
  );
}

export default BottomSiderBody;
