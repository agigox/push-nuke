import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';
import styled from '@emotion/styled';
import Buttons from '../../../../../../utils/Buttons';
import { changeDisplayMode } from '../../../../../../../redux/reducers/crossReducer';
import { DisplayModes } from '../../../../../../../enums/DisplayModes';
import { selectDisplayMode } from '../../../../../../../redux/selectors/crossSelectors';

const StyledRow = styled(Row)`
  justify-content: space-between;
  @media only screen and (max-width: 767px) {
    justify-content: center;
    margin-top: 40px;
  }
`;

function ModeButtons() {
  const dispatch = useDispatch();
  const displayMode = useSelector(selectDisplayMode);
  const handleClick = (mode) => {
    dispatch(changeDisplayMode(mode));
  };

  return (
    <StyledRow>
      <Col>
        <Buttons
          styling="chips tranches"
          clickHandler={() => {
            return handleClick(DisplayModes.SLICES);
          }}
          active={displayMode === DisplayModes.SLICES}
        >
          Unités de production
        </Buttons>
      </Col>
      <Col>
        <Buttons
          styling="chips carte"
          clickHandler={() => {
            return handleClick(DisplayModes.MAP);
          }}
          active={displayMode === DisplayModes.MAP}
        >
          Carte
        </Buttons>
      </Col>
    </StyledRow>
  );
}

export default ModeButtons;
