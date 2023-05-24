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
import Rive7 from 'images/rive-7.svg';
import Rive8 from 'images/rive-8.svg';
import Rive9 from 'images/rive-9.svg';
import Rive10 from 'images/rive-10.svg';
import Rive11 from 'images/rive-11.svg';
import Rive12 from 'images/rive-12.svg';
import Rive12L from 'images/rive-12-l.svg';
import Rive13 from 'images/rive-13.svg';
import Rive13L from 'images/rive-13-l.svg';
import Rive14 from 'images/rive-14.svg';
import Rive14L from 'images/rive-14-l.svg';
import Rive15 from 'images/rive-15.svg';
import Rive15L from 'images/rive-15-l.svg';
import Rive16 from 'images/rive-16.svg';
import Rive16L from 'images/rive-16-l.svg';
import Rive17 from 'images/rive-17.svg';
import Rive18 from 'images/rive-18.svg';
import Rive19 from 'images/rive-19.svg';
import Rive20 from 'images/rive-20.svg';
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
            <img src={Rive7} alt="rive-7" className="rive-7 rives" />
            <img src={Rive8} alt="rive-8" className="rive-8 rives" />
            <img src={Rive9} alt="rive-9" className="rive-9 rives" />
            <img src={Rive10} alt="rive-10" className="rive-10 rives" />
            <img src={Rive11} alt="rive-11" className="rive-11 rives" />
            <img src={Rive12} alt="rive-12" className="rive-12 rives" />
            <img src={Rive12L} alt="rive-12-l" className="rive-12-l rives" />
            <img src={Rive13} alt="rive-13" className="rive-13 rives" />
            <img src={Rive13L} alt="rive-13-l" className="rive-13-l rives" />
            <img src={Rive14} alt="rive-14" className="rive-14 rives" />
            <img src={Rive14L} alt="rive-14-l" className="rive-14-l rives" />
            <img src={Rive15} alt="rive-15" className="rive-15 rives" />
            <img src={Rive15L} alt="rive-15-l" className="rive-15-l rives" />
            <img src={Rive16} alt="rive-16" className="rive-16 rives" />
            <img src={Rive16L} alt="rive-16-l" className="rive-16-l rives" />
            <img src={Rive17} alt="rive-17" className="rive-17 rives" />
            <img src={Rive18} alt="rive-18" className="rive-18 rives" />
            <img src={Rive19} alt="rive-19" className="rive-19 rives" />
            <img src={Rive20} alt="rive-20" className="rive-20 rives" />
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
                      productionCategory={values[0].productionCategory}
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
