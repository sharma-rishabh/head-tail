const assert = require('assert');
const { parseArgs } = require('../../src/tail/parseArgs.js');

describe('parseArgs', () => {
  it('should give all files as file array.', () => {
    return assert.deepStrictEqual(parseArgs(['a.txt', 'b.txt']), {
      files: ['a.txt', 'b.txt'],
      options: []
    });
  });
});
