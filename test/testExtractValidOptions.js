const assert = require('assert');
const { extractValidOption } = require('../src/extractValidOption.js');

describe('extractValidOption', () => {
  it('should give the only option present', () => {
    return assert.deepStrictEqual(extractValidOption([{ option: '-n', count: 10 }]), { option: '-n', count: 10 });
  });
  it('should give the last option present', () => {
    return assert.deepStrictEqual(extractValidOption([{ option: '-n', count: 20 }, { option: '-n', count: 10 }]), { option: '-n', count: 10 });
  });
});
