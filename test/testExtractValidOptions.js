const assert = require('assert');
const {
  extractValidOption,
  validateOptions,
  areAllSwitchesSame,
  assertSwitchesValidity,
  assertLineCountValidity
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
  it('should throw  differentOptions error if different options are given at the same time.', () => {
    return assert.throws(() => validateOptions([{ option: '-n', count: 10 }, { option: '-c', count: 10 }]), {
      name: 'differentOptions',
      message: 'head:can\'t combine line and byte counts'
    });
  });
  it('should throw  invalidSwitch error if options are provided are not valid.', () => {
    return assert.throws(() => validateOptions([{ option: '-d', count: 10 }, { option: '-c', count: 10 }]), {
      name: 'invalidSwitch',
      message: 'head:illegal option --d\nusage: head [-n lines | -c bytes] [file ...]',
      option: '-d'
    });
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
    return assert.throws(() => assertSwitchesValidity([{ option: '-d', count: 10 }, { option: '-c', count: 10 }]), {
      name: 'invalidSwitch',
      message: 'head:illegal option --d\nusage: head [-n lines | -c bytes] [file ...]',
      option: '-d'
    });
  });
});

describe('assertLineCountValidity', () => {
  it('should not throw an error if line count is valid.', () => {
    return assert.ok(assertLineCountValidity({ option: '-n', count: '10' }));
  });
  it('should throw throw an error if line count is valid.', () => {
    return assert.throws(() => assertLineCountValidity({ option: '-n', count: 0 }), {
      name: 'illegalLineCount',
      message: 'head: illegal line count -- 0',
      count: 0
    });
  });
  it('should throw throw an error if line count is not present.', () => {
    return assert.throws(() => assertLineCountValidity({ option: '-n', count: NaN }), {
      name: 'illegalLineCount',
      message: 'head: illegal line count -- NaN',
      count: NaN
    });
  });
});
