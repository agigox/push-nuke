import { Col, Row } from 'antd';
import React from 'react';
import styled from '@emotion/styled';
import { HEIGHT_JAUGE_MIX } from '../../../utils/constants';

const StyledRow = styled(Row)`
  &.jauge-modal {
    height: ${(props) => {
      return props.size;
    }}px;
    width: 23px;
    align-content: flex-start;
    .nuclear-sector {
      background: #ffc700;
    }
    .hydraulics-sector {
      background: #2672b0;
    }
    .fossil_gas-sector {
      background: #f20809;
    }
    .biomass-sector {
      background: green;
    }
    .fossil_hard_coal-sector {
      background: #8c7a49;
    }
    .fossil_oil-sector {
      background: #7a549f;
    }
    .solar-sector {
      background: yellow;
    }
    .offshore-sector {
      background: #39b593;
    }
  }
`;
const StyledCol = styled(Col)`
  height: ${(props) => {
    return props.prod;
  }}px;
`;
export function MixJauge({ categories }) {
  const pmax = categories.reduce((accumulator, currentValue) => {
    const pmaxValues = currentValue.values.reduce((accumul, current) => {
      return accumul + current.production.value;
    }, 0);
    return accumulator + pmaxValues;
  }, 0);
  return (
    <StyledRow className="jauge-modal" size={HEIGHT_JAUGE_MIX}>
      {categories.map((category) => {
        const categoryProduction = category.values.reduce(
          (accumulator, currentValue) => {
            return accumulator + currentValue.production.value;
          },
          0,
        );
        return (
          <StyledCol
            className={`sector-item ${category.key.toLowerCase()}-sector`}
            key={category.key}
            prod={Math.round((categoryProduction * HEIGHT_JAUGE_MIX) / pmax)}
            span={24}
          />
        );
      })}
    </StyledRow>
  );
}
