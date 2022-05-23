const assert = require('assert');
const { tail } = require('../src/tailLib.js');

describe('tail', () => {
  it('should give the all lines of the given content', () => {
    const content = '1\n2\n3\n4';
    return assert.strictEqual(tail(content), content);
  });
});
