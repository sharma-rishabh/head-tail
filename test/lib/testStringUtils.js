const { splitBy, joinBy } = require('../../src/lib/stringUtils.js');
const assert = require('assert');

describe('splitBy', () => {
  it('should split content by \n', () => {
    assert.deepStrictEqual(splitBy('a\nb', '\n'), ['a', 'b']);
  });
  it('should split content by the given separator.', () => {
    assert.deepStrictEqual(splitBy('a\nb', ''), ['a', '\n', 'b']);
  });
});

describe('joinBy', () => {
  it('should join given array with \n', () => {
    assert.strictEqual(joinBy(['a', 'b'], '\n'), 'a\nb');
  });
  it('should join content by the given connector.', () => {
    assert.deepStrictEqual(joinBy(['a', 'b'], ''), 'ab');
  });
});
