const assert = require('assert');
const { parseArgs, getLegalOptions } = require('../../src/tail/parseArgs.js');

describe('parseArgs', () => {
  it('should give all files as file array.', () => {
    return assert.deepStrictEqual(parseArgs(['a.txt', 'b.txt']), {
      files: ['a.txt', 'b.txt'],
      options: []
    });
  });
});

describe('getLegalOptions', () => {
  it('should return all legal options', () => {
    return assert.deepStrictEqual(getLegalOptions(), ['-n', '-c']);
  });
});
