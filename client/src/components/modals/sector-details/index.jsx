import React from 'react';
import { useSelector } from 'react-redux';

import { Col, Row } from 'antd';
import styled from 'styled-components';
import { selectPerTypeByProductionCategory } from 'redux/selectors/dataSelectors';
import { SectorItem } from './SectorItem';
import { MixJauge } from './MixJauge';
import { RoundPercents } from './RoundPercents';

const CustomRow = styled(Row)`
  row-gap: 12px;
  flex-wrap: nowrap;
  .marker {
    width: 16px;
    height: 16px;
    border-radius: 2px;
    margin-right: 6px;
    &.prod {
      background: linear-gradient(91.66deg, #36c90a 10.18%, #46ea54 91.31%);
    }
    &.dispo {
      background: linear-gradient(91.66deg, #0079d1 10.18%, #009dd1 91.31%);
    }
    &.indispo {
      background: linear-gradient(91.66deg, #d0574f 10.18%, #d0574f 91.31%);
    }
  }
  .separator {
    width: 0;
    height: 485px;
    border: 1px solid #767676;
    margin-right: 28px;
  }
  .titles {
    column-gap: 5px;
    margin-bottom: 12px;
  }
`;
function SectorDetails() {
  const categories = useSelector(selectPerTypeByProductionCategory).filter(
    (category) => {
      return category.key !== 'ALL';
    },
  );

  return (
    <CustomRow className="secteur-details">
      <Col flex="750px">
        <Row>
          <Col span={24}>
            <Row
              align="middle"
              justify="space-between"
              style={{ marginBottom: '35px' }}
            >
              <Col flex="313px" className="sector-title">
                Dètails par filière
              </Col>
              <Col flex="auto">
                <Row justify="end">
                  <Col>
                    <Row>
                      <Col className="marker prod" />
                      <Col className="marks-text">Production</Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <Col className="marker dispo" />
                      <Col className="marks-text">Disponible</Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <Col className="marker indispo" />
                      <Col className="marks-text">Indisponible</Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row className="titles">
              <Col flex="150px" />
              <Col flex="80px" className="regularBody">
                Capacité
              </Col>
              <Col flex="67px" className="regularBody">
                Production
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            {categories.map((category) => {
              console.log(category);
              return (
                <SectorItem
                  key={category.key}
                  sector={category.key}
                  values={category.values}
                />
              );
            })}
          </Col>
        </Row>
      </Col>
      <Col className="separator" />
      <Col>
        <Row style={{ rowGap: '34px' }}>
          <Col span={24}>
            <Row
              align="middle"
              justify="space-between"
              style={{ marginBottom: '35px' }}
            >
              <Col flex="313px" className="sector-title">
                MIX ELECTRIQUE
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row wrap={false}>
              <Col>
                <MixJauge categories={categories} />
              </Col>
              <Col>
                <RoundPercents categories={categories} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </CustomRow>
  );
}

export default SectorDetails;
