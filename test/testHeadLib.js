const assert = require('assert');
const { extractData, splitBy, joinBy, head } = require('../src/headLib.js');

describe('extractData', () => {
  it('should give array back if array has only 10 elements.', () => {
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

describe('splitBy', () => {
  it('should split content by \n', () => {
    return assert.deepStrictEqual(splitBy('a\nb'), ['a', 'b']);
  });
});

describe('joinBy', () => {
  it('should join given array with \n', () => {
    return assert.strictEqual(joinBy(['a', 'b']), 'a\nb');
  });
});

describe('head', () => {
  it('should give head of an empty file.', () => {
    return assert.strictEqual(head(''), '');
  });
  it('should give same content back if lines are less than 10', () => {
    return assert.strictEqual(head('a\nb'), 'a\nb');
  });
});
