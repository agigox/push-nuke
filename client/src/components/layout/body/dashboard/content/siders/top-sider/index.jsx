import { Col, Row } from 'antd';
import React from 'react';
import useDeviceDetect from 'utils/useDeviceDetect';
import TopSiderBody from './TopSiderBody';
import TopSiderButton from './TopSiderButton';

function TopSider() {
  const isMobile = useDeviceDetect();
  return (
    <Row gutter={[0, 27]}>
      <Col span={24}>
        <TopSiderBody />
      </Col>
      {!isMobile && (
        <Col span={24} style={{ textAlign: 'center' }}>
          <TopSiderButton />
        </Col>
      )}
    </Row>
  );
}

export default TopSider;
