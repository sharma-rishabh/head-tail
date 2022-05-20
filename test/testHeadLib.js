const assert = require('assert');
const { extractData, splitBy, joinBy, head } = require('../src/headLib.js');

describe('extractData', () => {
  it('should give array back if array has only 10 elements.', () => {
    const array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    return assert.deepStrictEqual(extractData(array), array);
  });
  it('should give the whole array back if length is less than 10.', () => {
    const array = [1];
    return assert.deepStrictEqual(extractData(array), array);
  });
  it('should give first 10 elements back if array length is more than 10.',
    () => {
      const array =
        ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'];
      const expectedArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
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
  it('should give first 10 lines of the content if it is more than 10 lines',
    () => {
      const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
      const expectedContent = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj';
      return assert.strictEqual(head(content), expectedContent);
    });
});
