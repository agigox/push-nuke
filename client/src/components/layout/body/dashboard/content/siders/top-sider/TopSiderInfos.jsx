import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';
import { toPercent, formatNumberToFr } from '../../../../../../../utils';

const StyledRow = styled(Row)`
  @media only screen and (min-width: 767px) {
    align-items: center;
    margin: 0;
    margin-left: 13px;
    flex-wrap: nowrap;
    &.percents-text {
      flex-direction: column;
      .production-percent-text {
        flex-basis: 192px;
        width: 100%;
      }
      .rest-percent-text,
      .unavailable-percent-text {
        padding-top: 30px;
        flex-basis: 52px;
        width: 100%;
        .rest-percent-text-row {
          height: 100%;
          align-content: flex-end;
          .separator-percent-text {
            width: 0px;
            height: 9.5px;
            border: 1px solid #000000;
          }
          .percents-row {
            column-gap: 7px;
            align-items: baseline;
          }
        }
      }
      .prod-text {
        align-items: baseline;
        column-gap: 6px;
      }
      .separator {
        display: none;
      }
    }
  }
  @media only screen and (max-width: 767px) {
    align-items: flex-start;
    margin-left: 23px;
    &.percents-text {
      flex-direction: column;
      height: 96px;
      .production-percent-text {
        flex-basis: 32px;
        width: 177px;
      }
      .production-percent-row {
        flex-direction: row;
        flex-wrap: nowrap;
        .prod-text {
          flex-direction: row;
          flex-wrap: nowrap;
        }
      }
      .rest-percent-text,
      .unavailable-percent-text {
        flex-basis: 32px;
        .rest-percent-text-row {
          flex-direction: row;
          flex-wrap: nowrap;
        }
      }
      .separator {
        width: 0px;
        height: 7px;
        border: 0.5px solid #000000;
        margin-left: 10px;
        margin-right: 10px;
        position: relative;
        top: 5px;
      }
      .text-1 {
        flex-basis: 90px;
      }
    }
  }
`;
function TopSiderInfos({ unavailable, pmax, production }) {
  const rest = pmax - unavailable - production;
  return (
    <StyledRow className="percents-text">
      <Col className="production-percent-text" span={24}>
        <Row className="production-percent-row">
          <Col span={24} className="text-1">
            Production
          </Col>
          <Col span={24}>
            <Row className="prod-text">
              <Col className="text-2">
                {formatNumberToFr(production / 1000)}
              </Col>
              <Col className="text-unit">GW</Col>
              <Col className="separator" />
              <Col span={24} className="text-unit-percent">
                {`${toPercent(production, pmax)}%`}
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col className="rest-percent-text" span={24}>
        <Row className="rest-percent-text-row">
          <Col span={24} className="text-1">
            Disponible
          </Col>
          <Col span={24} className="text-2">
            <Row className="percents-row">
              <Col className="text-1-1">
                {rest < 0 ? 0 : formatNumberToFr(rest / 1000)}
              </Col>
              <Col className="text-1-2">GW</Col>
              <Col className="separator" />
              <Col className="separator-percent-text" />
              <Col className="text-1-3">{`${
                rest < 0 ? 0 : toPercent(rest, pmax)
              }%`}</Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col className="unavailable-percent-text" span={24}>
        <Row className="rest-percent-text-row">
          <Col span={24} className="text-1">
            Indisponible
          </Col>
          <Col span={24} className="text-2">
            <Row className="percents-row">
              <Col className="text-1-1">
                {rest >= 0
                  ? formatNumberToFr(unavailable / 1000)
                  : formatNumberToFr((pmax - production) / 1000)}
              </Col>
              <Col className="text-1-2">GW</Col>
              <Col className="separator" />
              <Col className="separator-percent-text" />
              <Col className="text-1-3">{`${
                rest >= 0
                  ? toPercent(unavailable, pmax)
                  : toPercent(pmax - production, pmax)
              }%`}</Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </StyledRow>
  );
}

export default TopSiderInfos;
