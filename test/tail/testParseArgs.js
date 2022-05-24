const assert = require('assert');
const {
  parseArgs,
  getLegalOptions,
  parseLineOption,
  parseCharOption,
  getOptionsAndParsers,
  getParser,
  isOptionLegal
} = require('../../src/tail/parseArgs.js');
const { createIterator } = require('../../src/tail/createIterator.js');

describe('parseArgs', () => {
  it('should give all files in an array.', () => {
    return assert.deepStrictEqual(parseArgs(['a.txt', 'b.txt']), {
      files: ['a.txt', 'b.txt'],
      options: []
    });
  });
  it('should give option in options array.', () => {
    return assert.deepStrictEqual(parseArgs(['-n10', 'a.txt', 'b.txt']), {
      files: ['a.txt', 'b.txt'],
      options: [{ flag: '-n', count: '10' }]
    });
  });
  it('should give all options in options array.', () => {
    return assert.deepStrictEqual(parseArgs(['-n10', '-c', '10', 'a.txt', 'b.txt']), {
      files: ['a.txt', 'b.txt'],
      options: [{ flag: '-n', count: '10' }, { flag: '-c', count: '10' }]
    });
  });
  it('should throw if one of the option given is invalid.', () => {
    return assert.throws(() => parseArgs(['-n10', '-c', '10', '-d19', 'a.txt', 'b.txt']), {
      name: 'illegalOption',
      message: `'tail: illegal option -- d
usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]`});
  });
});

describe('getLegalOptions', () => {
  it('should return all legal options', () => {
    return assert.deepStrictEqual(getLegalOptions(), ['-n', '-c']);
  });
});

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
      }
    ]);
  });
});

describe('getParser', () => {
  it('should should return parser for line.', () => {
    return assert.deepStrictEqual(getParser('-n10'), parseLineOption);
  });
  it('should should return parser for line.', () => {
    return assert.deepStrictEqual(getParser('-c10'), parseCharOption);
  });
});

describe('isOptionLegal', () => {
  it('should return true if option is legal.', () => {
    return assert.ok(isOptionLegal('-n10'));
  });
  it('should return true if option is illegal.', () => {
    return assert.strictEqual(isOptionLegal('-d10'), false);
  });
});
