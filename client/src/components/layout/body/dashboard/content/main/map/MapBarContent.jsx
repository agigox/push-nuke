import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';
import { HEIGHT_MAP_BAR } from '../../../../../../../utils/constants';

const StyledRow = styled(Row)`
  border: 3px solid rgba(255, 255, 255, 0.8);
  border-radius: 5px;
  height: ${HEIGHT_MAP_BAR}px;
  box-sizing: content-box !important;
  width: ${(props) => {
    return props.pmax;
  }}px;
  .map-bar-rest {
    height: ${(props) => {
      return HEIGHT_MAP_BAR - props.down - props.prod;
    }}px;
    background: linear-gradient(91.66deg, #0079d1 10.18%, #009dd1 91.31%);
  }
  .map-bar-prod {
    height: ${(props) => {
      return props.prod;
    }}px;
    background: linear-gradient(91.66deg, #36c90a 10.18%, #46ea54 91.31%);
    border-radius: 3px 3px 0 0;
  }
  .map-bar-down {
    height: ${(props) => {
      return props.down;
    }}px;
    background: #d0574f;
    border-radius: 0 0 3px 3px;
  }
`;
function MapBarContent({ down, prod, pmax }) {
  const getBarWidth = (pmaxValue) => {
    if (pmaxValue > 3000) {
      return 30;
    }
    if (pmaxValue > 1500) {
      return 26;
    }
    if (pmaxValue > 500) {
      return 22;
    }
    if (pmaxValue > 300) {
      return 18;
    }
    return 10;
  };
  return (
    <StyledRow down={down} prod={prod} pmax={getBarWidth(pmax)}>
      <Col span={24} className="map-bar-prod" />
      <Col span={24} className="map-bar-rest" />
      <Col span={24} className="map-bar-down" />
    </StyledRow>
  );
}

export default MapBarContent;
