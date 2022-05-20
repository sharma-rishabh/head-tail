const assert = require('assert');
const { parseArgs } = require('../src/parseArgs.js');

describe('parseArgs', () => {
  it('should work with option(-n) with spaces before count.', () => {
    return assert.deepStrictEqual(
      parseArgs(['-n', '1', 'a.txt']),
      { fileName: 'a.txt', options: { separator: '\n', count: 1 } }
    );
  });
  it('should work with option(-c) with spaces before count.', () => {
    return assert.deepStrictEqual(
      parseArgs(['-c', '1', 'a.txt']),
      { fileName: 'a.txt', options: { separator: '', count: 1 } }
    );
  });
  it('should provide default options if no cl options are given.', () => {
    return assert.deepStrictEqual(
      parseArgs(['a.txt']),
      { fileName: 'a.txt', options: { separator: '\n', count: 10 } }
    );
  });
});
