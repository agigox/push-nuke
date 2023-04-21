/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
import styled from '@emotion/styled';
import { Button, Col, Row } from 'antd';
import React, { useState } from 'react';
import ArrowUp from '../../../../images/arrow_upward.svg';

const StyledRow = styled(Row)`
  height: 86px;
  width: 1440px;
  background: #22323a;
  padding-right: 95px;
  align-content: center;
  text-align: right;
  flex-direction: row-reverse;
  img {
    cursor: pointer;
  }
`;
function GoTop() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  window.addEventListener('scroll', toggleVisible);
  return (
    <StyledRow className="go-to-top">
      <Col flex="31px">
        <img
          src={ArrowUp}
          alt=""
          onClick={() => {
            return scrollToTop();
          }}
        />
      </Col>
      <Col className="go-top-text" flex="auto">
        <a
          onClick={() => {
            return scrollToTop();
          }}
        >
          Retour en haut de page
        </a>
      </Col>
    </StyledRow>
  );
}

export default GoTop;
