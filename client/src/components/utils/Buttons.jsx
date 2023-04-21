import styled from '@emotion/styled';
import { Button } from 'antd';
import React from 'react';

const StyledButton = styled(Button)`
  &.summary {
    background-color: white;
    padding: 4px 5px;
    height: auto;
    color: #009dd1;
    border: 2px solid #009dd1;
    border-radius: 8px;
  }
  &.chips {
    svg {
      margin-right: 3px;
    }
    line-height: 16px;
    padding: 3px 5px;
    background-color: transparent;
    border: 1px solid #ffffff;
    height: 35px;
    &.active {
      background: #e9f7fc;
      border: 1px solid #009dd1;
      color: #004d66;
    }
    &.tranches {
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
    }
    &.carte {
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    }
  }
  &.refresh {
    width: 54px;
    height: 48px;
    padding: 12px 15px;
    border: 2px solid #ffffff;
    border-radius: 8px;
    background-color: transparent;
  }
  @media only screen and (max-width: 767px) {
    &.chips {
      padding: 0 5px;
      height: 28px;
    }
  }
`;
function Buttons({
  children,
  styling,
  active,
  clickHandler,
  icon,
  loading,
  disabled,
}) {
  return (
    <StyledButton
      className={`${styling} ${active ? 'active' : ''} `}
      type="primary"
      onClick={clickHandler}
      icon={icon}
      loading={loading}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
}

export default Buttons;
