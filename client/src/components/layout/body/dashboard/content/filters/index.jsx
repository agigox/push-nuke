import { Col, Row } from 'antd';
import React from 'react';
import useDeviceDetect from 'utils/useDeviceDetect';
import FilterChips from './chips';
import RefreshDate from './refresh';

function Filters() {
  const isMobile = useDeviceDetect();
  return (
    <Row wrap={false} justify="space-around" align="middle">
      {!isMobile && (
        <Col flex="334px">
          <RefreshDate />
        </Col>
      )}
      <Col flex="auto">
        <FilterChips />
      </Col>
    </Row>
  );
}

export default Filters;
