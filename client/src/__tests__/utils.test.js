import { orderByTwoFields, sortByTwoFields } from '../utils';

it('Testing sortBy', () => {
  const data = [
    { a: 'a', b: 2 },
    { a: 'a', b: 1 },
    { a: 'b', b: 5 },
    { a: 'a', b: 3 },
  ];
  const functionResult = sortByTwoFields(data, ['a', 'b']);
  const expectedResult = [
    { a: 'a', b: 1 },
    { a: 'a', b: 2 },
    { a: 'a', b: 3 },
    { a: 'b', b: 5 },
  ];
  expect(expectedResult).toHaveLength(4);
  expect(functionResult).toEqual(expectedResult);
});

it('Testing order by', () => {
  const users1 = [
    { user: 'fred', age: 1 },
    { user: 'barney', age: 334 },
    { user: 'fred', age: 4 },
    { user: 'barney', age: 2 },
  ];
  const functionResult = orderByTwoFields(
    users1,
    ['user', 'age'],
    ['asc', 'asc'],
  );
  const expectedResult = [
    { user: 'barney', age: 2 },
    { user: 'barney', age: 334 },
    { user: 'fred', age: 1 },
    { user: 'fred', age: 4 },
  ];
  expect(functionResult).toEqual(expectedResult);
});
