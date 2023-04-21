import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import SVGMap from 'images/map.svg';
import SVGMapMobile from 'images/map-mobile.svg';
import Rive1 from 'images/rive-1.svg';
import Rive2 from 'images/rive-2.svg';
import Rive3 from 'images/rive-3.svg';
import Rive4 from 'images/rive-4.svg';
import Rive5 from 'images/rive-5.svg';
import Rive6 from 'images/rive-6.svg';
import { selectCurrentCategory } from 'redux/selectors/crossSelectors';
import { selectPerUnitByFieldAndProductionUnit } from 'redux/selectors/dataSelectors';
import useDeviceDetect from 'utils/useDeviceDetect';
import PieChartItem from './PieChartItem';

const StyledRow = styled(Row)`
  .pie-chart {
    flex-direction: column;
    row-gap: 5px;
  }
  .map {
    position: absolute;
    left: 77.86px;
    top: 38px;
  }
`;
const getSize = (productionUnitPmax, isMobile) => {
  if (productionUnitPmax > 3000) {
    return !isMobile ? 54 : 24;
  }
  if (productionUnitPmax > 1500) {
    return !isMobile ? 40 : 18;
  }
  if (productionUnitPmax > 500) {
    return !isMobile ? 34 : 16;
  }
  return !isMobile ? 20 : 10;
};
const getItemClass = (itemClass) => {
  return itemClass
    .toLowerCase()
    .split(' ')
    .join('')
    .split("'")
    .join('')
    .split('ô')
    .join('o')
    .split(/é|è|ê/)
    .join('e');
};
function Map() {
  const currentCategory = useSelector(selectCurrentCategory);
  const dataGroupedByField = useSelector((state) => {
    return selectPerUnitByFieldAndProductionUnit(state, currentCategory);
  });

  const isMobile = useDeviceDetect();
  return (
    <Row>
      <Col className="map-container" span={24}>
        {!isMobile && <img src={SVGMap} alt="map" className="map" />}
        {isMobile && <img src={SVGMapMobile} alt="map" className="map" />}
        {['HYDRAULICS', 'ALL'].includes(currentCategory) && !isMobile && (
          <>
            <img src={Rive1} alt="rive-1" className="rive-1 rives" />
            <img src={Rive2} alt="rive-2" className="rive-2 rives" />
            <img src={Rive3} alt="rive-3" className="rive-3 rives" />
            <img src={Rive4} alt="rive-4" className="rive-4 rives" />
            <img src={Rive5} alt="rive-5" className="rive-5 rives" />
            <img src={Rive6} alt="rive-6" className="rive-6 rives" />
          </>
        )}
        {dataGroupedByField.values.map((referentielItem) => {
          const { key, values } = referentielItem;
          const productionUnitPmax = values.reduce(
            (accumulator, currentValue) => {
              return accumulator + currentValue.pmax;
            },
            0,
          );
          const productionUnitProduction = values.reduce(
            (accumulator, currentValue) => {
              return accumulator + currentValue.productionCapacity;
            },
            0,
          );
          const unavailabilityUnitProduction = values.reduce(
            (accumulator, currentValue) => {
              return accumulator + currentValue.unavailableCapacity;
            },
            0,
          );
          const data = [
            {
              name: 'Available',
              value:
                productionUnitPmax -
                unavailabilityUnitProduction -
                productionUnitProduction,
              color: '#0079D1',
            },
            {
              name: 'Unavailable',
              value: unavailabilityUnitProduction,
              color: '#D0574F',
            },
            {
              name: 'Prod',
              value: productionUnitProduction,
              color: '#41e03e',
            },
          ];

          return (
            <StyledRow
              key={key}
              className={`${getItemClass(
                key,
              )} mark-city ${values[0].productionCategory.toLowerCase()} circle-${getSize(
                productionUnitPmax,
                isMobile,
              )}`}
            >
              <Col style={{ alignSelf: 'center' }}>
                <Row className="pie-chart">
                  <Col>
                    <PieChartItem
                      data={data}
                      productionUnitName={key}
                      pmax={productionUnitPmax}
                    />
                  </Col>
                </Row>
              </Col>
            </StyledRow>
          );
        })}
      </Col>
    </Row>
  );
}

export default Map;
