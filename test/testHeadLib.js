const assert = require('assert');
const { extractData } = require('../src/headLib.js');

describe('extractData', () => {
  it('should give first 10 elements of the array.', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return assert.deepStrictEqual(extractData(array), array);
  });
  it('should give the whole array back if length is less than 10.', () => {
    const array = [1];
    return assert.deepStrictEqual(extractData(array), array);
  });
  it('should give first 10 elements back if array length is more than 10.',
    () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      const expectedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      return assert.deepStrictEqual(extractData(array), expectedArray);
    });
});
