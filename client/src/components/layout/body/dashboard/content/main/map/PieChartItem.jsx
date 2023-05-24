/* eslint-disable react/no-array-index-key */
import { Row } from 'antd';
import React from 'react';
// import { useSelector } from 'react-redux';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import useDeviceDetect from 'utils/useDeviceDetect';
import BarIndication from './BarIndication';

function PieChartItem({ data, productionUnitName, pmax, productionCategory }) {
  const isMobile = useDeviceDetect();
  const handleClick = () => {
    return 33;
  };
  const getSize = () => {
    if (pmax > 3000) {
      return !isMobile ? 54 : 24;
    }
    if (pmax > 1500) {
      return !isMobile ? 40 : 18;
    }
    if (pmax > 500) {
      return !isMobile ? 34 : 16;
    }
    return !isMobile ? 20 : 10;
  };
  const size = getSize();
  return (
    <Row>
      <PieChart width={size} height={size} onMouseEnter={handleClick}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={size / 2}
          fill="#8884d8"
          dataKey="value"
          animationBegin={100}
          animationDuration={1000}
          startAngle={90}
          endAngle={450}
        >
          {[...data].map((entry, index) => {
            return (
              <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
            );
          })}
        </Pie>

        <Tooltip
          content={
            <BarIndication
              productionUnitName={productionUnitName}
              productionUnitPmax={pmax}
              down={data[1].value}
              prod={data[2].value}
              productionCategory={productionCategory}
            />
          }
          style={{ zIndex: 99 }}
        />
      </PieChart>
    </Row>
  );
}

export default PieChartItem;
