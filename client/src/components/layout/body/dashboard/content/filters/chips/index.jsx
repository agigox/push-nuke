import { Col, Row } from 'antd';
import React from 'react';
import useDeviceDetect from 'utils/useDeviceDetect';
import ModeButtons from './ModeButtons';
import CategoryButtons from './CategoryButtons';

function FilterChips() {
  const isMobile = useDeviceDetect();
  return (
    <Row justify="space-between">
      <Col>
        <CategoryButtons />
      </Col>
      {!isMobile && (
        <Col>
          <ModeButtons />
        </Col>
      )}
    </Row>
  );
}
export default FilterChips;
