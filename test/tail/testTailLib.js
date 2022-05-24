const assert = require('assert');
const { tail } = require('../../src/tail/tailLib.js');

describe('tail', () => {
  it('should give the all lines of the given content', () => {
    const content = '1\n2\n3\n4';
    return assert.strictEqual(tail(content, 10, '\n'), content);
  });
  it('should give the ten lines of the given content', () => {
    const content = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11';
    const expected = '2\n3\n4\n5\n6\n7\n8\n9\n10\n11';
    return assert.strictEqual(tail(content, 10, '\n'), expected);
  });
  it('should give the specified lines of the given content', () => {
    const content = '1\n2\n3\n4';
    const expected = '3\n4';
    return assert.strictEqual(tail(content, 2, '\n'), expected);
  });
  it('should give the specified character of the given content', () => {
    const content = '1\n2\n3\n4';
    const expected = '\n4';
    return assert.strictEqual(tail(content, 2, ''), expected);
  });
});
