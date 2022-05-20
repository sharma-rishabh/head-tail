const { headMain } = require('../src/headLib.js');
const assert = require('assert');

const mockReadFile = (expectedFileName, content) => {
  return (fileName, encoding) => {
    assert.strictEqual(fileName, expectedFileName);
    assert.strictEqual(encoding, 'utf8');
    return content;
  };
};

describe('headMain', () => {
  it('should take file from main and pass the content to head.', () => {
    const mockedReadFile = mockReadFile('a.txt', 'a\nb');
    return assert.strictEqual(headMain(mockedReadFile, 'a.txt'), 'a\nb');
  });
  it('should take cl options and parse them as options object.', () => {
    const mockedReadFile = mockReadFile('a.txt', 'a\nb\nc');
    return assert.strictEqual(headMain(mockedReadFile, '-n', '2', 'a.txt'), 'a\nb');
  });
});
