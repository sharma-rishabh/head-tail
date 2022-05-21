const assert = require('assert');
const { parseArgs } = require('../src/parseArgs.js');

describe('parseArgs', () => {
  it('should work with option(-n) with spaces before count.', () => {
    return assert.deepStrictEqual(
      parseArgs(['-n', '1', 'a.txt']),
      { files: ['a.txt'], optionsArray: [{ option: '-n', count: 1 }] }
    );
  });
  it('should work with option(-c) with spaces before count.', () => {
    return assert.deepStrictEqual(
      parseArgs(['-c', '1', 'a.txt']),
      { files: ['a.txt'], optionsArray: [{ option: '-c', count: 1 }] }
    );
  });
  it('should provide default options if no cl options are given.', () => {
    return assert.deepStrictEqual(
      parseArgs(['a.txt']),
      { files: ['a.txt'], optionsArray: [{ option: '-n', count: 10 }] }
    );
  });
  it('should return the last option if many options are given', () => {
    return assert.deepStrictEqual(
      parseArgs(['-n', '20', '-n', '10', 'a.txt']),
      { files: ['a.txt'], optionsArray: [{ option: '-n', count: 20 }, { option: '-n', count: 10 }] }
    );
  });
});
