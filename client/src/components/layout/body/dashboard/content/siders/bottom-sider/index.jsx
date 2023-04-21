import { Col, Row } from 'antd';
import React from 'react';
import BottomSiderBody from './BottomSiderBody';

function BottomSider() {
  return (
    <Row style={{ rowGap: '32px' }}>
      <Col>
        <BottomSiderBody />
      </Col>
    </Row>
  );
}

export default BottomSider;
