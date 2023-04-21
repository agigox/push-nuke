import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';
import useDeviceDetect from 'utils/useDeviceDetect';
import {
  HEIGHT_TOP_SIDER_JAUGE,
  HEIGHT_TOP_SIDER_JAUGE_MOBILE,
} from 'utils/constants';

const StyledRow = styled(Row)`
  &.percents {
    flex-direction: column;
    .productions-percent {
      flex-basis: ${(props) => {
        return props.production;
      }}px;
      width: 100%;
      border-radius: 10px 10px 0px 0px;
      background: linear-gradient(180deg, #34c601 0%, #46eb57 100%);
    }
    .up-percent {
      flex-basis: ${(props) => {
        return props.rest >= 0 ? props.rest : 0;
      }}px;
      background: linear-gradient(180deg, #0078cf 0%, #009dd1 100%);
      width: 100%;
    }
    .down-percent {
      flex-basis: ${(props) => {
        return props.rest >= 0
          ? props.unavailable
          : props.heightjauge - props.production;
      }}px;
      width: 100%;
      background: #d0574f;
      border-radius: 0px 0px 10px 10px;
    }
    .separator-percent {
      flex-basis: 5px;
      width: 100%;
    }
    @keyframes progres {
      0% {
        height: 0%;
      }
      25% {
        height: 50%;
      }
      50% {
        height: 75%;
      }
      75% {
        height: 85%;
      }
      100% {
        height: 100%;
      }
    }
  }
  @media only screen and (max-width: 767px) {
    &.percents {
      .productions-percent {
        border-radius: 3px 3px 0px 0px;
      }
      .down-percent {
        border-radius: 0px 0px 3px 3px;
      }
    }
  }
`;
function TopSiderTubes({ unavailable, pmax, production }) {
  const isMobile = useDeviceDetect();
  const HEIGHT_JAUGE = isMobile
    ? HEIGHT_TOP_SIDER_JAUGE_MOBILE
    : HEIGHT_TOP_SIDER_JAUGE;
  return (
    <StyledRow
      unavailable={Math.round((unavailable * HEIGHT_JAUGE) / pmax)}
      production={Math.round((production * HEIGHT_JAUGE) / pmax)}
      rest={
        HEIGHT_JAUGE -
        Math.round((unavailable * HEIGHT_JAUGE) / pmax) -
        Math.round((production * HEIGHT_JAUGE) / pmax)
      }
      heightjauge={HEIGHT_JAUGE}
      align="middle"
      gutter={13}
      wrap={false}
      style={{ margin: 0 }}
      className="percents"
    >
      <Col className="productions-percent" span={24} />
      <Col className="up-percent" span={24} />
      <Col className="separator-percent" span={24} />
      <Col className="down-percent" span={24} />
    </StyledRow>
  );
}

export default TopSiderTubes;
