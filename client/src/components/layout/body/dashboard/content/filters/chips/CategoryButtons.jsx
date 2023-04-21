/* eslint-disable no-prototype-builtins */
import { Col, Row } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ProductionCategories } from '../../../../../../../enums/ProductionCategories';
import { changeCurrentCategory } from '../../../../../../../redux/reducers/crossReducer';
import { selectCurrentCategory } from '../../../../../../../redux/selectors/crossSelectors';
// eslint-disable-next-line import/named
import { selectReferentielByProductionCategory } from '../../../../../../../redux/selectors/referentielSelectors';
import Buttons from '../../../../../../utils/Buttons';
import {
  Nuclear,
  Valve,
  Propane,
  Wind,
  Oil,
  Landscape,
  Wave,
  Eco,
} from '../../../../../../utils/SVGs';

const getIconBySector = (icon) => {
  switch (icon) {
    case 'FOSSIL_GAS':
      return <Propane />;
    case 'FOSSIL_HARD_COAL':
      return <Landscape />;
    case 'FOSSIL_OIL':
      return <Oil />;
    case 'HYDRAULICS':
      return <Valve />;
    case 'NUCLEAR':
      return <Nuclear />;
    case 'OFFSHORE':
      return <Wind />;
    case 'BIOMASS':
      return <Eco />;
    case 'TIDAL':
      return <Wave />;
    default:
      return null;
  }
};
const StyledRow = styled(Row)`
  column-gap: 5px;
  @media only screen and (max-width: 767px) {
    margin-left: 25px;
  }
`;
function CategoryButtons() {
  const dispatch = useDispatch();
  const productionTypes = useSelector(selectReferentielByProductionCategory);
  const currentCategory = useSelector(selectCurrentCategory);
  const handleClick = (category) => {
    dispatch(changeCurrentCategory(category));
  };
  return (
    <StyledRow wrap={false}>
      {productionTypes.map((category) => {
        return (
          <Col key={category.key}>
            <Buttons
              styling={`chips chips-${category.key.toLowerCase()}`}
              clickHandler={() => {
                return handleClick(category.key);
              }}
              active={currentCategory === category.key}
              icon={getIconBySector(category.key)}
              marginRight={3}
            >
              {ProductionCategories.hasOwnProperty(category.key)
                ? ProductionCategories[category.key]
                : category.key}
            </Buttons>
          </Col>
        );
      })}
    </StyledRow>
  );
}

export default CategoryButtons;
