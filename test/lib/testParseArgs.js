const assert = require('assert');
const {
  parseArgs,
  getParserAndValidator
} = require('../../src/lib/parseArgs.js');

const {
  parseCharOption,
  parseLineOption,
  illegalOptionError,
  parseHyphen,
  parsePlus,
  offsetValidator,
  legalOptionValidator
} = require('../../src/tail/parseTail.js');

describe('parseArgs', () => {
  it('should give all files in an array.', () => {
    const allOptions = [
      {
        flag: '-n',
        parser: parseLineOption
      },
      {
        flag: '-c',
        parser: parseCharOption
      }
    ];
    assert.deepStrictEqual(parseArgs(['a.txt', 'b.txt'], allOptions, illegalOptionError), {
      files: ['a.txt', 'b.txt'],
      options: []
    });
  });
  it('should give option in options array.', () => {
    const allOptions = [
      {
        flag: '-n',
        parser: parseLineOption,
        validator: offsetValidator
      }
    ];
    assert.deepStrictEqual(parseArgs(['-n10', 'a.txt', 'b.txt'], allOptions, illegalOptionError), {
      files: ['a.txt', 'b.txt'],
      options: [{ flag: '-n', count: '10' }]
    });
  });
  it('should use plus parser to parse plus options', () => {
    const allOptions = [
      {
        flag: '+',
        parser: parsePlus,
        validator: legalOptionValidator
      }
    ];
    assert.deepStrictEqual(parseArgs(['+10', 'a.txt', 'b.txt'], allOptions, illegalOptionError), {
      files: ['a.txt', 'b.txt'],
      options: [{ flag: '-n', count: '+10' }]
    });
  });
  it('should consider a plus not followed by a digit as a file', () => {
    const allOptions = [
      {
        flag: '+',
        parser: parsePlus,
        validator: legalOptionValidator
      }
    ];
    assert.deepStrictEqual(parseArgs(['+p', 'a.txt', 'b.txt'], allOptions, illegalOptionError), {
      files: ['+p', 'a.txt', 'b.txt'],
      options: []
    });
  });

  it('should give all options in options array.', () => {
    const allOptions = [
      {
        flag: '-n',
        parser: parseLineOption,
        validator: offsetValidator
      },
      {
        flag: '-c',
        parser: parseCharOption,
        validator: offsetValidator
      }
    ];
    assert.deepStrictEqual(parseArgs(['-n10', '-c', '10', 'a.txt', 'b.txt'], allOptions, illegalOptionError), {
      files: ['a.txt', 'b.txt'],
      options: [{ flag: '-n', count: '10' }, { flag: '-c', count: '10' }]
    });
  });

  it('should throw if one of the option given is invalid.', () => {
    const allOptions = [
      {
        flag: '-',
        parser: parseHyphen,
        validator: legalOptionValidator
      }
    ];
    assert.throws(() => parseArgs(['-d19', 'a.txt', 'b.txt'], allOptions, illegalOptionError), {
      name: 'illegalOption',
      message: `tail: illegal option -- d
usage: tail [-r] [-q] [-c # | -n #] [file ...]`});
  });
});

describe('getParserAndValidator', () => {
  it('should should return parser for line.', () => {
    const allOptions = [
      {
        flag: '-n',
        parser: parseLineOption,
        validator: offsetValidator
      },
      {
        flag: '-c',
        parser: parseCharOption,
        validator: offsetValidator
      }
    ];
    assert.deepStrictEqual(getParserAndValidator('-n10', allOptions), { parser: parseLineOption, validator: offsetValidator });
  });
  it('should should return parser for line.', () => {
    const allOptions = [
      {
        flag: '-n',
        parser: parseLineOption,
        validator: offsetValidator
      },
      {
        flag: '-c',
        parser: parseCharOption,
        validator: offsetValidator
      }
    ];
    assert.deepStrictEqual(getParserAndValidator('-c10', allOptions), { parser: parseCharOption, validator: offsetValidator });
  });
});
