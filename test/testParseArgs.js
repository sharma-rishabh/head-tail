const assert = require('assert');
const { parseArgs, getFiles } = require('../src/parseArgs.js');

describe('parseArgs', () => {
  it('should work with option(-n) with spaces before count.', () => {
    return assert.deepStrictEqual(
      parseArgs(['-n', '1', 'a.txt']),
      { files: ['a.txt'], options: { option: '-n', count: 1 } }
    );
  });
  it('should work with option(-c) with spaces before count.', () => {
    return assert.deepStrictEqual(
      parseArgs(['-c', '1', 'a.txt']),
      { files: ['a.txt'], options: { option: '-c', count: 1 } }
    );
  });
  it('should provide default options if no cl options are given.', () => {
    return assert.deepStrictEqual(
      parseArgs(['a.txt']),
      { files: ['a.txt'], options: { option: '-n', count: 10 } }
    );
  });
});

describe('getFiles', () => {
  it('should give single file back from the given array.', () => {
    return assert.deepStrictEqual(getFiles(['a.txt']), ['a.txt']);
  });
  it('should give multiple files back from the given array if there are multiple files.', () => {
    return assert.deepStrictEqual(getFiles(['a.txt', 'b.txt']), ['a.txt', 'b.txt']);
  });
  it('should give the file out of options and file', () => {
    return assert.deepStrictEqual(getFiles(['-n', '50', 'b.txt']), ['b.txt']);
  });
});
