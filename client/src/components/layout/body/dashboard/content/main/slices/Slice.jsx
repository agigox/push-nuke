/* eslint-disable react/no-array-index-key */
import { Col, Row } from 'antd';
import React from 'react';
import SubSlice from './SubSlice';

function Slice({ data, isHydroCurrent }) {
  return (
    <Row className="slice">
      <Col className="slice-title" span={24}>
        {data.key}
      </Col>
      <Col span={24}>
        <Row className="slice-content-row">
          {data.values.map((value, index) => {
            return (
              <SubSlice
                key={`${value.key}-${index}`}
                unitName={isHydroCurrent ? value.key : value.unitName}
                pmax={
                  isHydroCurrent
                    ? value.values.reduce((accumulator, currentValue) => {
                        return accumulator + currentValue.pmax;
                      }, 0)
                    : value.pmax
                }
                production={
                  isHydroCurrent
                    ? value.values.reduce((accumulator, currentValue) => {
                        return accumulator + currentValue.productionCapacity;
                      }, 0)
                    : value.productionCapacity
                }
                available={
                  isHydroCurrent
                    ? value.values.reduce((accumulator, currentValue) => {
                        return accumulator + currentValue.availableCapacity;
                      }, 0)
                    : value.availableCapacity
                }
              />
            );
          })}
        </Row>
      </Col>
    </Row>
  );
}

export default Slice;
