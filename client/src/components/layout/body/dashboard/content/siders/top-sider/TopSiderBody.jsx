import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentCategory } from 'redux/selectors/crossSelectors';
import {
  HEIGHT_TOP_SIDER_JAUGE,
  HEIGHT_TOP_SIDER_JAUGE_MOBILE,
} from 'utils/constants';
import {
  selectCurrentUnavailable,
  selectProductionByCategory,
} from 'redux/selectors/dataSelectors';
import { selectPmaxCapacityCurrentCategory } from 'redux/selectors/pmaxSelectors';
import TopSiderInfos from './TopSiderInfos';
import TopSiderTubes from './TopSiderTubes';

const StyledRow = styled(Row)`
  height: ${HEIGHT_TOP_SIDER_JAUGE}px;
  .col-jauges {
    flex: 0 0 74px;
  }
  @media only screen and (max-width: 767px) {
    height: ${HEIGHT_TOP_SIDER_JAUGE_MOBILE + 6}px;
    .col-jauges {
      flex: 0 0 21px;
    }
  }
`;
function TopSiderBody() {
  const { unavailable } = useSelector(selectCurrentUnavailable);
  const currentCategory = useSelector(selectCurrentCategory);
  const production = useSelector((state) => {
    return selectProductionByCategory(state, currentCategory);
  });
  const pmax = useSelector(selectPmaxCapacityCurrentCategory);
  return (
    <StyledRow className="top-sider-body" wrap={false}>
      <Col className="col-jauges">
        <TopSiderTubes
          unavailable={unavailable}
          pmax={pmax}
          production={production}
        />
      </Col>
      <Col flex="auto">
        <TopSiderInfos
          unavailable={unavailable}
          pmax={pmax}
          production={production}
        />
      </Col>
    </StyledRow>
  );
}

export default TopSiderBody;
