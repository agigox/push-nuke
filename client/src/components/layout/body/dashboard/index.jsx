import React from 'react';
import { Row, Col } from 'antd';
import useDeviceDetect from 'utils/useDeviceDetect';
import PageTitle from './PageTitle';
import Content from './content';

function Dashboard() {
  const isMobile = useDeviceDetect();
  return (
    <Row className="dashboard">
      {!isMobile && (
        <Col span={24}>
          <PageTitle />
        </Col>
      )}
      <Col span={24} className="overview-col">
        <Content />
      </Col>
    </Row>
  );
}

export default Dashboard;
