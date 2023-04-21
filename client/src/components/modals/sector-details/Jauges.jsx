import { Col, Row } from 'antd';
import React from 'react';
import styled from '@emotion/styled';
import { WIDTH_JAUGE_SECTOR_MODAL } from '../../../utils/constants';

const StyledRow = styled(Row)`
  &.jauge-modal {
    border-radius: 24px 0 0 24px;
    width: ${(props) => {
      return props.size;
    }}px;
    height: 25px;
    .production {
      background: linear-gradient(91.66deg, #36c90a 10.18%, #46ea54 91.31%);
      width: ${(props) => {
        return props.categorylastproduction;
      }}px;
      border-radius: 10px 0 0 10px;
    }
    .rest {
      background: linear-gradient(91.66deg, #0079d1 10.18%, #009dd1 91.31%);
      width: ${(props) => {
        return props.upcapacity < 0 ? 0 : props.upcapacity;
      }}px;
      border-radius: ${(props) => {
        if (
          props.categorylastproduction === 0 &&
          props.unavailablecapacity === 0
        ) {
          return '10px 10px 10px 10px';
        }
        if (props.categorylastproduction === 0) {
          return '10px 0 0 10px';
        }
        if (props.unavailablecapacity === 0) {
          return '0 10px 10px 0';
        }
        return '0 0 0 0';
      }};
    }
    .unavailable {
      background: #d0574f;
      width: ${({ unavailablecapacity, categorylastproduction, size }) => {
        const tmp = size - unavailablecapacity - categorylastproduction;
        if (tmp < 0) {
          return unavailablecapacity + tmp;
        }
        return unavailablecapacity;
      }}px;
      border-radius: 0 10px 10px 0;
    }
  }
`;
export function Jauges({
  unavailablecapacity,
  categorylastproduction,
  categoryCapacity,
}) {
  const unavailable = Math.round(
    (unavailablecapacity * WIDTH_JAUGE_SECTOR_MODAL) / categoryCapacity,
  );
  const lastProduction = Math.round(
    (categorylastproduction * WIDTH_JAUGE_SECTOR_MODAL) / categoryCapacity,
  );

  return (
    <StyledRow
      className="jauge-modal"
      unavailablecapacity={unavailable}
      categorylastproduction={lastProduction}
      upcapacity={WIDTH_JAUGE_SECTOR_MODAL - unavailable - lastProduction}
      size={WIDTH_JAUGE_SECTOR_MODAL}
    >
      <Col className="production" />
      <Col className="rest" />
      <Col className="unavailable" />
    </StyledRow>
  );
}
