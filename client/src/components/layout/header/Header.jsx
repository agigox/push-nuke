import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';
import Logo from 'images/logo.svg';

const StyledRow = styled(Row)`
  .container {
    margin: 0 auto;
    width: 1248px;
  }
  .separator {
    height: 24px;
    width: 0;
    border: 1px solid #009dd1;
  }
  .head-description {
    color: #ffffff;
  }
`;
function Header() {
  return (
    <StyledRow className="header" align="center">
      <Col className="container">
        <Row
          style={{ columnGap: '16px', alignItems: 'center', height: '100%' }}
        >
          <Col>
            <img src={Logo} alt="logo" />
          </Col>
          <Col className="separator" />
          <Col>
            <Row className="head-description">
              <Col className="text-2" span={24}>
                PORTAIL DONNÉES
              </Col>
              <Col className="text-1" span={24}>
                DU SYSTÈME ÉLECTRIQUE
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </StyledRow>
  );
}

export default Header;
