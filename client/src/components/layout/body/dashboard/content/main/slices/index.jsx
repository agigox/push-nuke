import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ProductionCategories } from '../../../../../../../enums/ProductionCategories';
import { selectCurrentCategory } from '../../../../../../../redux/selectors/crossSelectors';
import { selectPerUnitByProductionCategory } from '../../../../../../../redux/selectors/dataSelectors';
import Slices from './Slices';

const StyledRow = styled(Row)`
  @media only screen and (max-width: 767px) {
    .slices-title-page {
      margin-top: 42px;
      margin-bottom: 17px;
    }
  }
`;
function SlicesBody() {
  const currentCategory = useSelector(selectCurrentCategory);
  const unavailabilities = useSelector(selectPerUnitByProductionCategory);
  return (
    <StyledRow className="slices" style={{ rowGap: '17px' }}>
      {currentCategory === 'ALL' ? (
        unavailabilities
          .filter(({ key }) => {
            return key !== 'ALL';
          })
          .map((item) => {
            const { key } = item;

            return (
              <Col key={key} span={24}>
                <Row className="slices-category-row">
                  <Col
                    span={24}
                    className="slices-title-page"
                  >{`Filière ${ProductionCategories[key]}`}</Col>
                  <Col span={24}>
                    <Slices category={key} />
                  </Col>
                </Row>
              </Col>
            );
          })
      ) : (
        <Col span={24}>
          <Row className="slices-category-row">
            <Col
              span={24}
              className="slices-title-page"
            >{`Filière ${ProductionCategories[currentCategory]}`}</Col>
            <Col span={24}>
              <Slices category={currentCategory} />
            </Col>
          </Row>
        </Col>
      )}
    </StyledRow>
  );
}

export default SlicesBody;
