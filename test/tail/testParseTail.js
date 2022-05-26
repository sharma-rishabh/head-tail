const assert = require('assert');
const {
  parseLineOption,
  parseCharOption,
  getOptionsAndParsers,
  tailParse,
  parsePlus,
  parseHyphen,
  offsetValidator,
  legalOptionValidator
} = require('../../src/tail/parseTail.js');

const { createIterator } = require('../../src/tail/createIterator.js');

describe('parseLineOption', () => {
  it('Should parse an option whose values are separate.', () => {
    const iterableArgs = createIterator(['-n', '10']);
    assert.deepStrictEqual(parseLineOption(iterableArgs), { flag: '-n', count: '10' });
  });
  it('Should parse an option whose values are integrated.', () => {
    const iterableArgs = createIterator(['-n10']);
    assert.deepStrictEqual(parseLineOption(iterableArgs), { flag: '-n', count: '10' });
  });
  it('Should preserve signs for count provided by the user.', () => {
    const iterableArgs = createIterator(['-n+10', '-n-10']);
    assert.deepStrictEqual(parseLineOption(iterableArgs), { flag: '-n', count: '+10' });
    iterableArgs.nextElement();
    assert.deepStrictEqual(parseLineOption(iterableArgs), { flag: '-n', count: '-10' });
  });
});

describe('parseCharOption', () => {
  it('should parse an option whose values are separate', () => {
    const iterableArgs = createIterator(['-n', '10']);
    assert.deepStrictEqual(parseCharOption(iterableArgs), { flag: '-c', count: '10' });
  });
  it('Should parse an option whose values are integrated.', () => {
    const iterableArgs = createIterator(['-n10']);
    assert.deepStrictEqual(parseCharOption(iterableArgs), { flag: '-c', count: '10' });
  });
  it('Should preserve signs for count provided by the user.', () => {
    const iterableArgs = createIterator(['-n+10', '-n-10']);
    assert.deepStrictEqual(parseCharOption(iterableArgs), { flag: '-c', count: '+10' });
    iterableArgs.nextElement();
    assert.deepStrictEqual(parseCharOption(iterableArgs), { flag: '-c', count: '-10' });
  });
});

describe('getOptionsAndParsers', () => {
  it('should return all options and their parsers.', () => {
    assert.deepStrictEqual(getOptionsAndParsers(), [
      {
        flag: '-n',
        parser: parseLineOption,
        validator: offsetValidator
      },
      {
        flag: '-c',
        parser: parseCharOption,
        validator: offsetValidator
      },
      {
        flag: '+',
        parser: parsePlus,
        validator: legalOptionValidator
      },
      {
        flag: '-',
        parser: parseHyphen,
        validator: legalOptionValidator
      }
    ]);
  });
});

describe('tailParse', () => {
  it('should return parsed files for tail.', () => {
    assert.deepStrictEqual(tailParse(['a.txt', 'b.txt']), {
      options: [],
      files: ['a.txt', 'b.txt']
    });
  });
  it('should return parsed option for tail.', () => {
    assert.deepStrictEqual(tailParse(['-n10', '-n', '10', 'a.txt', 'b.txt']), {
      options: [{ flag: '-n', count: '10' }, { flag: '-n', count: '10' }],
      files: ['a.txt', 'b.txt']
    });
  });
  it('should return throw illegal offset error.', () => {
    assert.throws(() => tailParse(['-np', 'a.txt', 'b.txt']), {
      name: 'illegalOffsetError',
      message: 'tail: illegal offset -- p'
    });
  });
  it('should return throw illegal option error.', () => {
    assert.throws(() => tailParse(['-ppap', 'a.txt', 'b.txt']), {
      name: 'illegalOption',
      message: 'tail: illegal option -- p\nusage: tail [-r] [-q] [-c # | -n #] [file ...]'
    });
  });
});

describe('parsePlus', () => {
  it('should parse an option which starts with plus', () => {
    const iterableArgs = createIterator(['+10']);
    assert.deepStrictEqual(parsePlus(iterableArgs), { flag: '-n', count: '+10' });
  });
});

describe('parseHyphen', () => {
  it('should parse an option which starts with hyphen.', () => {
    const iterableArgs = createIterator(['-10']);
    assert.deepStrictEqual(parseHyphen(iterableArgs), { flag: '-n', count: '-10' });
  });
});
