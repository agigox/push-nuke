import { Col, Modal, Row } from 'antd';
import React, { useState } from 'react';
import SectorDetails from '../../../../../../modals/sector-details';
import Buttons from '../../../../../../utils/Buttons';

function TopSiderButtons() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Row>
      <Col span={24} style={{ textAlign: 'center' }}>
        <Buttons
          clickHandler={() => {
            return showModal();
          }}
          styling="summary"
        >
          Voir par filière
        </Buttons>
      </Col>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={1089}
      >
        <SectorDetails />
      </Modal>
    </Row>
  );
}

export default TopSiderButtons;
