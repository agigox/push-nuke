import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { DisplayModes } from '../../../../../../enums/DisplayModes';
import { selectDisplayMode } from '../../../../../../redux/selectors/crossSelectors';
import Map from './map';
import SlicesBody from './slices';

const StyledRow = styled(Row)`
  .slices-box {
    min-width: 920px;
  }
  @media only screen and (max-width: 767px) {
    &.over {
      overflow-x: scroll;
    }
  }
`;
function Main() {
  const displayMode = useSelector(selectDisplayMode);
  return (
    <StyledRow
      className={`main ${displayMode === DisplayModes.SLICES ? 'over' : ''}`}
    >
      <Col className="map-box" span={24}>
        {displayMode === DisplayModes.MAP && <Map />}
      </Col>
      <Col className="slices-box" span={24}>
        {displayMode === DisplayModes.SLICES && <SlicesBody />}
      </Col>
    </StyledRow>
  );
}

export default Main;
