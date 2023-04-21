import { expect } from 'chai';
import { getProductionCategory } from '../utils/helpers';

describe('Testing Helpers', () => {
  it('should test production categories', () => {
    const expectedResult = getProductionCategory('FOSSIL_BROWN_COAL_LIGNITE');
    const expectedResult1 = getProductionCategory('GEOTHERMAL');
    const expectedResult2 = getProductionCategory('OTHER');
    expect(expectedResult).to.equal('FOSSIL');
    expect(expectedResult1).to.equal('GEOTHERMAL');
    expect(expectedResult2).to.equal('OTHER');
  });
});
