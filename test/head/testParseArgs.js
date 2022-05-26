const assert = require('assert');
const { parseArgs, parseOption } = require('../../src/head/parseArgs.js');

describe('parseArgs', () => {
  it('should work with option(-n) with spaces before count.', () => {
    assert.deepStrictEqual(
      parseArgs(['-n', '1', 'a.txt']),
      { files: ['a.txt'], optionsArray: [{ option: '-n', count: '1' }] }
    );
  });
  it('should work with option(-c) with spaces before count.', () => {
    assert.deepStrictEqual(
      parseArgs(['-c', '1', 'a.txt']),
      { files: ['a.txt'], optionsArray: [{ option: '-c', count: '1' }] }
    );
  });
  it('should provide default options if no cl options are given.', () => {
    assert.deepStrictEqual(
      parseArgs(['a.txt']),
      { files: ['a.txt'], optionsArray: [{ option: '-n', count: '10' }] }
    );
  });
  it('should return all options as option objects.', () => {
    assert.deepStrictEqual(
      parseArgs(['-n', '20', '-n', '10', 'a.txt']),
      { files: ['a.txt'], optionsArray: [{ option: '-n', count: '20' }, { option: '-n', count: '10' }] }
    );
  });
  it('should return the similar object if options are integrated', () => {
    assert.deepStrictEqual(
      parseArgs(['-n20', '-n', '10', 'a.txt']),
      { files: ['a.txt'], optionsArray: [{ option: '-n', count: '20' }, { option: '-n', count: '10' }] }
    );
  });
});

describe('parseOption', () => {
  it('should parse an option if they are space separated', () => {
    assert.deepStrictEqual(parseOption('-n', '50'), { option: '-n', count: '50' });
  });
  it('should parse an option if they are integrated', () => {
    assert.deepStrictEqual(parseOption('-n50', 'a.txt'), { option: '-n', count: '50' });
  });
  it('should parse an option if it is special', () => {
    assert.deepStrictEqual(parseOption('-5', 'a.txt'), { option: '-n', count: '5' });
  });
});
