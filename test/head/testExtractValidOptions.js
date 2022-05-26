const assert = require('assert');
const {
  extractValidOption,
  validateOptions,
  areAllSwitchesSame,
  assertSwitchesValidity,
  assertLineCountValidity
} = require('../../src/head/extractValidOption.js');

describe('extractValidOption', () => {
  it('should give the only option present', () => {
    assert.deepStrictEqual(extractValidOption([{ option: '-n', count: 10 }]), { option: '-n', count: 10 });
  });
  it('should give the last option present', () => {
    assert.deepStrictEqual(extractValidOption([{ option: '-n', count: 20 }, { option: '-n', count: 10 }]), { option: '-n', count: 10 });
  });
});

describe('validateOptions', () => {
  it('should return the array it got if they are valid.', () => {
    assert.deepStrictEqual(validateOptions([{ option: '-n', count: 10 }]), [{ option: '-n', count: 10 }]);
  });
  it('should throw  differentOptions error if different options are given at the same time.', () => {
    assert.throws(() => validateOptions([{ option: '-n', count: 10 }, { option: '-c', count: 10 }]), {
      name: 'differentOptions',
      message: 'head:can\'t combine line and byte counts'
    });
  });
  it('should throw  invalidSwitch error if options are provided are not valid.', () => {
    assert.throws(() => validateOptions([{ option: '-d', count: 10 }, { option: '-c', count: 10 }]), {
      name: 'invalidSwitch',
      message: 'head:illegal option -- d\nusage: head [-n lines | -c bytes] [file ...]',
      option: '-d'
    });
  });
});

describe('areAllSwitchesSame', () => {
  it('should return true if all given options have same switch.', () => {
    assert.strictEqual(areAllSwitchesSame([{ option: '-n', count: 10 }]), true);
  });
  it('should return false if all given options don\'t have same switch.', () => {
    assert.strictEqual(areAllSwitchesSame([{ option: '-n', count: 10 }, { option: '-c', count: 10 }]), false);
  });
});

describe('assertSwitchesValidity', () => {
  it('should not throw error if all switches are valid.', () => {
    assert.ok(assertSwitchesValidity([{ option: '-n', count: 10 }, { option: '-c', count: 10 }]));
  });
  it('should throw error if all switches are not valid.', () => {
    assert.throws(() => assertSwitchesValidity([{ option: '-d', count: 10 }, { option: '-c', count: 10 }]), {
      name: 'invalidSwitch',
      message: 'head:illegal option -- d\nusage: head [-n lines | -c bytes] [file ...]',
      option: '-d'
    });
  });
});

describe('assertLineCountValidity', () => {
  it('should not throw an error if line count is valid.', () => {
    assert.ok(assertLineCountValidity({ option: '-n', count: '10' }));
  });

  it('should throw throw an error if line count is valid.', () => {
    assert.throws(() => assertLineCountValidity({ option: '-n', count: 0 }), {
      name: 'illegallineCount',
      message: 'head: illegal line count -- 0',
      count: 0
    });
  });

  it('should throw throw an error if byte count is valid.', () => {
    assert.throws(() => assertLineCountValidity({ option: '-c', count: 0 }), {
      name: 'illegalbyteCount',
      message: 'head: illegal byte count -- 0',
      count: 0
    });
  });

  it('should  throw an error if line count is not present.', () => {
    assert.throws(() => assertLineCountValidity({ option: '-n', count: NaN }), {
      name: 'illegallineCount',
      message: 'head: illegal line count -- NaN',
      count: NaN
    });
  });

  it('should throw an error that -n needs an option.', () => {
    assert.throws(() => assertLineCountValidity({ option: '-n', count: undefined }), {
      name: 'needArgument',
      message: 'head: option requires an argument -- n\nusage: head[-n lines | -c bytes][file ...]'
    });
  });
});
