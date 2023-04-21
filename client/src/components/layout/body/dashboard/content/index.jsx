/* eslint-disable no-unused-vars */
import React from 'react';
import { Row, Col, Card } from 'antd';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import useDeviceDetect from 'utils/useDeviceDetect';
import Filters from './filters';
import ModeButtons from './filters/chips/ModeButtons';
import Siders from './siders';
import Main from './main';
import { DisplayModes } from '../../../../../enums/DisplayModes';
import { selectDisplayMode } from '../../../../../redux/selectors/crossSelectors';

const StyledRow = styled(Row)`
  padding: 64px 95px;
  column-gap: 27px;
  row-gap: 32px;
  .content-box {
    flex-wrap: nowrap;
  }
  .content-filters {
    height: 48px;
  }
  .card-slices {
    box-shadow: none;
    .ant-card-body {
      background: #19252a;
      box-shadow: none;
      padding-top: 0;
      border-radius: 0;
      padding-left: 14px;
      padding-right: 0px;
    }
  }
  .card-map {
    box-shadow: none;
    .ant-card-body {
      background: #19252a;
      box-shadow: none;
      border-radius: 0;
      padding: 0;
    }
  }
  .siders-col {
    flex-basis: 301px;
  }
  .main-col {
    flex-basis: auto;
  }

  @media only screen and (max-width: 767px) {
    padding: 48px 0;
    row-gap: 25px;
    .card-map {
      box-shadow: none;
    }
    .content-box {
      flex-direction: column;
    }
    .siders-col {
      flex-basis: auto;
    }
    .content-filters {
      height: 32px;
      width: 390px;
      overflow-x: scroll;
    }
    .card-slices {
      box-shadow: none;
    }
  }
`;
function Content() {
  const displayMode = useSelector(selectDisplayMode);
  const isMobile = useDeviceDetect();
  return (
    <StyledRow>
      <Col span={24} className="content-filters">
        <Row>
          <Col span={24}>
            <Filters />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row style={{ columnGap: '16px' }} className="content-box">
          <Col className="siders-col">
            <Siders />
          </Col>
          {isMobile && (
            <Col>
              <ModeButtons />
            </Col>
          )}
          <Col className="main-col">
            <Card
              bordered={false}
              className={`${
                displayMode === DisplayModes.SLICES ? 'card-slices' : 'card-map'
              }`}
            >
              <Main />
            </Card>
          </Col>
        </Row>
      </Col>
    </StyledRow>
  );
}

export default Content;
