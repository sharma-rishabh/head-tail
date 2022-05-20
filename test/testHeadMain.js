const { headMain } = require('../src/headLib.js');
const assert = require('assert');

describe('headMain', () => {
  const mockReadFile = (expectedFileName, content) => {
    return (fileName, encoding) => {
      assert.equal(fileName, expectedFileName);
      assert.equal(encoding, 'utf8');
      return content;
    };
  };

  it('should take file from main and pass the content to head.', () => {
    const mockedReadFile = mockReadFile('a.txt', 'a\nb');
    return assert.strictEqual(headMain(mockedReadFile, 'a.txt'), 'a\nb');
  });
});
