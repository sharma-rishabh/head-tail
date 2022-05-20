const assert = require('assert');
const { extractData } = require('../src/headLib.js');

describe('extractData', () => {
  it('should give first 10 elements of the array.', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return assert.deepStrictEqual(extractData(array), array);
  });
});
