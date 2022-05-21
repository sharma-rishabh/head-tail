const assert = require('assert');
const { parseArgs, getFiles, getOptions } = require('../src/parseArgs.js');

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

describe('getOptions', () => {
  it('should return options provided as object', () => {
    return assert.deepStrictEqual(getOptions(['-n', '10']), [{ option: '-n', count: '10' }]);
  });
  it('should return options provided as object ignoring the file', () => {
    return assert.deepStrictEqual(getOptions(['-n', '10', 'a.txt']), [{ option: '-n', count: '10' }]);
  });
  it('should return all options in the given array as objects', () => {
    const actual = ['-n', '10', '-n', '12'];
    const expected = [
      { option: '-n', count: '10' },
      { option: '-n', count: '12' }
    ];
    return assert.deepStrictEqual(getOptions(actual), expected);
  });
  it('should return all the options in given array and ignore all the file names', () => {
    const actual = ['-n', '10', '-n', '12', '-c', '20', 'a.txt', 'b.txt'];
    const expected = [
      { option: '-n', count: '10' },
      { option: '-n', count: '12' },
      { option: '-c', count: '20' },
    ];
    return assert.deepStrictEqual(getOptions(actual), expected);
  });
  it('should return empty array if no options are present', () => {
    const actual = ['a.txt', 'b.txt'];
    const expected = [];
    return assert.deepStrictEqual(getOptions(actual), expected);
  });
});
