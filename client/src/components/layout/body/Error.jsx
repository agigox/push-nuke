import React from 'react';
import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import Warning from '../../../images/fully_down.svg';

const StyledRow = styled(Row)`
  height: calc(100vh - 158px);
  background-color: #19252a;
  flex-direction: row;
  align-content: center;
  .text-1 {
    color: red;
    font-size: 32px;
    text-align: center;
  }
  .text-2 {
    color: red;
    font-size: 20px;
    text-align: center;
  }

  .image {
    text-align: center;
    padding-top: 30px;
    padding-bottom: 30px;
    img {
      width: 330px;
    }
  }
`;
function Error() {
  return (
    <StyledRow justify="space-around" align="middle">
      <Col span={24} className="image">
        <img src={Warning} alt="" />
      </Col>
      <Col span={24} className="text-1">
        Erreur API Portail Data
      </Col>
      <Col span={24} className="text-2">
        Veuillez nous excuser pour la gêne occasionnée, veuillez réessayer plus
        tard.
      </Col>
    </StyledRow>
  );
}

export default Error;
