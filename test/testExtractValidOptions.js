const assert = require('assert');
const {
  extractValidOption,
  validateOptions,
  areAllSwitchesSame
} = require('../src/extractValidOption.js');

describe('extractValidOption', () => {
  it('should give the only option present', () => {
    return assert.deepStrictEqual(extractValidOption([{ option: '-n', count: 10 }]), { option: '-n', count: 10 });
  });
  it('should give the last option present', () => {
    return assert.deepStrictEqual(extractValidOption([{ option: '-n', count: 20 }, { option: '-n', count: 10 }]), { option: '-n', count: 10 });
  });
});

describe('validateOptions', () => {
  it('should return the array it got if they are valid.', () => {
    return assert.deepStrictEqual(validateOptions([{ option: '-n', count: 10 }]), [{ option: '-n', count: 10 }]);
  });
});

describe.only('areAllSwitchesSame', () => {
  it('should return true if all given options have same switch.', () => {
    return assert.strictEqual(areAllSwitchesSame([{ option: '-n', count: 10 }]), true);
  });
  it('should return false if all given options don\'t have same switch.', () => {
    return assert.strictEqual(areAllSwitchesSame([{ option: '-n', count: 10 }, { option: '-c', count: 10 }]), false);
  });
});
