/* eslint-disable no-prototype-builtins */
import React from 'react';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { selectPerUnitByProductionCategory } from 'redux/selectors/dataSelectors';
import { selectPmaxCapacityByCategory } from 'redux/selectors/pmaxSelectors';
import RightArrow from 'images/sector-modal/arrow_right.svg';
import { Image } from './Image';
import { Name } from './Name';
import Percents from './Percents';
import { Jauges } from './Jauges';

const StyledRow = styled(Row)`
  column-gap: 5px;
  margin-bottom: 15px;
  height: 36px;
  .image-row {
    width: 170px;
    column-gap: 13px;
    align-items: end;
    position: relative;
    bottom: 8px;
  }
  .capacity {
    color: #767676;
  }
`;
export function SectorItem({ sector, values }) {
  const data = useSelector(selectPerUnitByProductionCategory).find((item) => {
    return item.key === sector;
  });

  const categoryCapacity = useSelector((state) => {
    return selectPmaxCapacityByCategory(state, sector);
  });
  const categoryProduction = values.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.production.value;
  }, 0);
  let unavailableCapacity = 0;
  if (!_.isUndefined(data)) {
    unavailableCapacity = data.values.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.unavailableCapacity;
    }, 0);
  }

  return (
    <StyledRow wrap={false}>
      <Col flex="150px">
        <Row className="image-row" wrap={false}>
          <Col>
            <Image sector={sector} />
          </Col>
          <Col>
            <Name sector={sector} />
          </Col>
        </Row>
      </Col>
      <Col flex="80px">
        <Row align="middle">
          <Col className="regularBody" span={24}>
            {`${categoryCapacity}MW`}
          </Col>
        </Row>
      </Col>
      <Col flex="67px">
        <Row align="middle">
          <Col className="boldBody" span={24}>
            {`${(categoryProduction / 1000).toFixed(1)}GW`.replace('.', ',')}
          </Col>
        </Row>
      </Col>
      <Col>
        <Row align="middle">
          <Col>
            <img src={RightArrow} alt="rightArrow" />
          </Col>
        </Row>
      </Col>
      <Col>
        <Row wrap={false} align="middle">
          <Col>
            <Percents
              categoryLastProduction={categoryProduction}
              categoryCapacity={categoryCapacity}
            />
          </Col>
          <Col>
            <Jauges
              unavailablecapacity={unavailableCapacity}
              categorylastproduction={categoryProduction}
              categoryCapacity={categoryCapacity}
            />
          </Col>
        </Row>
      </Col>
    </StyledRow>
  );
}
