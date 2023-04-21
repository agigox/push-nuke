import React from 'react';
import { Col, Row } from 'antd';
import RefreshText from './RefreshText';
import Buttons from '../../../../../../utils/Buttons';
import { RefreshIcon } from '../../../../../../utils/SVGs';

function RefreshDate() {
  const handleClick = async () => {
    console.log('TODO...');
  };

  return (
    <Row wrap={false} className="refresh" align="middle" gutter={[19, 0]}>
      <Col>
        <Buttons
          styling="refresh"
          icon={<RefreshIcon />}
          loading={false}
          clickHandler={() => {
            return handleClick();
          }}
        />
      </Col>
      <Col>
        <RefreshText />
      </Col>
    </Row>
  );
}

export default RefreshDate;
