const { splitBy, joinBy } = require('../src/stringUtils.js');
const assert = require('assert');

describe('splitBy', () => {
  it('should split content by \n', () => {
    return assert.deepStrictEqual(splitBy('a\nb', '\n'), ['a', 'b']);
  });
  it('should split content by the given separator.', () => {
    return assert.deepStrictEqual(splitBy('a\nb', ''), ['a', '\n', 'b']);
  });
});

describe('joinBy', () => {
  it('should join given array with \n', () => {
    return assert.strictEqual(joinBy(['a', 'b'], '\n'), 'a\nb');
  });
  it('should join content by the given connector.', () => {
    return assert.deepStrictEqual(joinBy(['a', 'b'], ''), 'ab');
  });
});
