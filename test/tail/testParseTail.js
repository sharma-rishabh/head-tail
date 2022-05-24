const assert = require('assert');
const {
  parseLineOption,
  parseCharOption,
  getOptionsAndParsers,
  tailParse,
  parsePlus,
  parseHyphen
} = require('../../src/tail/parseTail.js');

const { createIterator } = require('../../src/tail/createIterator.js');

describe('parseLineOption', () => {
  it('Should parse an option whose values are separate.', () => {
    const iterableArgs = createIterator(['-n', '10']);
    return assert.deepStrictEqual(parseLineOption(iterableArgs), { flag: '-n', count: '10' });
  });
  it('Should parse an option whose values are integrated.', () => {
    const iterableArgs = createIterator(['-n10']);
    return assert.deepStrictEqual(parseLineOption(iterableArgs), { flag: '-n', count: '10' });
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
    return assert.deepStrictEqual(parseCharOption(iterableArgs), { flag: '-c', count: '10' });
  });
  it('Should parse an option whose values are integrated.', () => {
    const iterableArgs = createIterator(['-n10']);
    return assert.deepStrictEqual(parseCharOption(iterableArgs), { flag: '-c', count: '10' });
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
    return assert.deepStrictEqual(getOptionsAndParsers(), [
      {
        flag: '-n',
        parser: parseLineOption
      },
      {
        flag: '-c',
        parser: parseCharOption
      },
      {
        flag: '+',
        parser: parsePlus
      },
      {
        flag: '-',
        parser: parseHyphen
      }
    ]);
  });
});

describe('tailParse', () => {
  it('should return parsed files for tail.', () => {
    return assert.deepStrictEqual(tailParse(['a.txt', 'b.txt']), {
      options: [],
      files: ['a.txt', 'b.txt']
    });
  });
  it('should return parsed option for tail.', () => {
    return assert.deepStrictEqual(tailParse(['-n10', '-n', '10', 'a.txt', 'b.txt']), {
      options: [{ flag: '-n', count: '10' }, { flag: '-n', count: '10' }],
      files: ['a.txt', 'b.txt']
    });
  });
});

describe('parsePlus', () => {
  it('should parse an option which starts with plus', () => {
    const iterableArgs = createIterator(['+10']);
    return assert.deepStrictEqual(parsePlus(iterableArgs), { flag: '-n', count: '+10' });
  });
  it('should throw an error if argument are not numbers', () => {
    const iterableArgs = createIterator(['+p']);
    return assert.throws(() => parsePlus(iterableArgs),
      {
        name: 'readFileError',
        message: 'tail: +p:No such file or directory',
        fileName: '+p'
      }
    );
  });
});

describe('parseHyphen', () => {
  it('should parse an option which starts with hyphen.', () => {
    const iterableArgs = createIterator(['-10']);
    return assert.deepStrictEqual(parseHyphen(iterableArgs), { flag: '-n', count: '-10' });
  });
  it('should throw an error if argument are not numbers', () => {
    const iterableArgs = createIterator(['-p']);
    return assert.throws(() => parseHyphen(iterableArgs), {
      name: 'illegalOption',
      message: `'tail: illegal option -- p
usage: tail [-r] [-q] [-c # | -n #] [file ...]`
    });
  });
});
