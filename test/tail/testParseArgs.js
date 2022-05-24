const assert = require('assert');
const {
  parseArgs,
  getParser,
  isOptionLegal
} = require('../../src/tail/parseArgs.js');

const {
  parseCharOption,
  parseLineOption,
  illegalOptionError
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
    return assert.deepStrictEqual(parseArgs(['a.txt', 'b.txt'], allOptions, illegalOptionError), {
      files: ['a.txt', 'b.txt'],
      options: []
    });
  });
  it('should give option in options array.', () => {
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
    return assert.deepStrictEqual(parseArgs(['-n10', 'a.txt', 'b.txt'], allOptions, illegalOptionError), {
      files: ['a.txt', 'b.txt'],
      options: [{ flag: '-n', count: '10' }]
    });
  });
  it('should give all options in options array.', () => {
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
    return assert.deepStrictEqual(parseArgs(['-n10', '-c', '10', 'a.txt', 'b.txt'], allOptions, illegalOptionError), {
      files: ['a.txt', 'b.txt'],
      options: [{ flag: '-n', count: '10' }, { flag: '-c', count: '10' }]
    });
  });
  it('should throw if one of the option given is invalid.', () => {
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
    return assert.throws(() => parseArgs(['-n10', '-c', '10', '-d19', 'a.txt', 'b.txt'], allOptions, illegalOptionError), {
      name: 'illegalOption',
      message: `'tail: illegal option -- d
usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]`});
  });
});

describe('getParser', () => {
  it('should should return parser for line.', () => {
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
    return assert.deepStrictEqual(getParser('-n10', allOptions), parseLineOption);
  });
  it('should should return parser for line.', () => {
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
    return assert.deepStrictEqual(getParser('-c10', allOptions), parseCharOption);
  });
});

describe('isOptionLegal', () => {
  it('should return true if option is legal.', () => {
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
    return assert.ok(isOptionLegal('-n10', allOptions));
  });
  it('should return true if option is illegal.', () => {
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
    return assert.strictEqual(isOptionLegal('-d10', allOptions), false);
  });
});
