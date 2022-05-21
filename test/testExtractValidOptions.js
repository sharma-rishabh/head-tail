const assert = require('assert');
const {
  extractValidOption,
  validateOptions,
  areAllSwitchesSame,
  assertSwitchesValidity
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

describe('areAllSwitchesSame', () => {
  it('should return true if all given options have same switch.', () => {
    return assert.strictEqual(areAllSwitchesSame([{ option: '-n', count: 10 }]), true);
  });
  it('should return false if all given options don\'t have same switch.', () => {
    return assert.strictEqual(areAllSwitchesSame([{ option: '-n', count: 10 }, { option: '-c', count: 10 }]), false);
  });
});

describe('assertSwitchesValidity', () => {
  it('should not throw error if all switches are valid.', () => {
    return assert.ok(assertSwitchesValidity([{ option: '-n', count: 10 }, { option: '-c', count: 10 }]));
  });
  it('should throw error if all switches are not valid.', () => {
    return assert.throws(() => assertSwitchesValidity([{ option: '-d', count: 10 }, { option: '-c', count: 10 }]));
  });
});
