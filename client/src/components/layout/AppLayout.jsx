import { Col, Row } from 'antd';
import React from 'react';
import Body from 'components/layout/body';

function AppLayout() {
  return (
    <Row>
      <Col span={24}>
        <Body />
      </Col>
    </Row>
  );
}

export default AppLayout;
