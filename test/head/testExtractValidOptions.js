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
    const actual = extractValidOption([{ flag: '-n', count: 10 }]);
    const expected = { flag: '-n', count: 10 };

    assert.deepStrictEqual(actual, expected);
  });
  it('should give the last option present', () => {
    const actual = extractValidOption(
      [
        { flag: '-n', count: 20 },
        { flag: '-n', count: 10 }
      ]
    );

    const expected = { flag: '-n', count: 10 };

    assert.deepStrictEqual(actual, expected);
  });
});

describe('validateOptions', () => {
  it('should return the array it got if they are valid.', () => {
    const actual = validateOptions([{ flag: '-n', count: 10 }]);
    const expected = [{ flag: '-n', count: 10 }];

    assert.deepStrictEqual(actual, expected);
  });

  it('should throw  differentOptions error if different options are given at the same time.', () => {
    const input = [{ flag: '-n', count: 10 }, { flag: '-c', count: 10 }];
    const expectedError = {
      name: 'differentOptions',
      message: 'head:can\'t combine line and byte counts'
    };

    assert.throws(() => validateOptions(input), expectedError);
  });

  it('should throw  invalidSwitch error if options are provided are not valid.', () => {
    assert.throws(() => validateOptions([{ flag: '-d', count: 10 }, { flag: '-c', count: 10 }]), {
      name: 'invalidSwitch',
      message: 'head:illegal option -- d\nusage: head [-n lines | -c bytes] [file ...]',
      flag: '-d'
    });
  });
});

describe('areAllSwitchesSame', () => {
  it('should return true if all given options have same switch.', () => {
    assert.strictEqual(areAllSwitchesSame([{ flag: '-n', count: 10 }]), true);
  });

  it('should work if given options don\'t have same switch.', () => {
    const actual = areAllSwitchesSame(
      [
        { flag: '-n', count: 10 },
        { flag: '-c', count: 10 }
      ]
    );

    assert.strictEqual(actual, false);
  });
});

describe('assertSwitchesValidity', () => {
  it('should not throw error if all switches are valid.', () => {
    const actual = assertSwitchesValidity(
      [
        { flag: '-n', count: 10 },
        { flag: '-c', count: 10 }
      ]
    );

    assert.strictEqual(actual, undefined);
  });

  it('should throw error if all switches are not valid.', () => {
    const expectedError = {
      name: 'invalidSwitch',
      message: 'head:illegal option -- d\nusage: head [-n lines | -c bytes] [file ...]',
      flag: '-d'
    };

    const input = [
      { flag: '-d', count: 10 },
      { flag: '-c', count: 10 }
    ];

    assert.throws(() => assertSwitchesValidity(input), expectedError);
  });
});

describe('assertLineCountValidity', () => {
  it('should not throw an error if line count is valid.', () => {
    const actual = assertLineCountValidity({ flag: '-n', count: '10' });
    assert.strictEqual(actual, undefined);
  });

  it('should throw throw an error if line count is valid.', () => {
    const input = { flag: '-n', count: 0 };

    const expectedError = {
      name: 'illegallineCount',
      message: 'head: illegal line count -- 0',
      count: 0
    };

    assert.throws(() => assertLineCountValidity(input), expectedError);
  });

  it('should throw throw an error if byte count is valid.', () => {
    const input = { flag: '-c', count: 0 };
    const expectedError = {
      name: 'illegalbyteCount',
      message: 'head: illegal byte count -- 0',
      count: 0
    };

    assert.throws(() => assertLineCountValidity(input), expectedError);
  });

  it('should  throw an error if line count is not present.', () => {
    const input = { flag: '-n', count: NaN };

    const expectedError = {
      name: 'illegallineCount',
      message: 'head: illegal line count -- NaN',
      count: NaN
    };

    assert.throws(() => assertLineCountValidity(input), expectedError);
  });

  it('should throw an error that -n needs an option.', () => {
    const input = { flag: '-n', count: undefined };

    const expectedError = {
      name: 'needArgument',
      message: 'head: option requires an argument -- n\nusage: head[-n lines | -c bytes][file ...]'
    };

    assert.throws(() => assertLineCountValidity(input), expectedError);
  });
});
