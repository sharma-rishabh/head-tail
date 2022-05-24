const assert = require('assert');
const { tailMain } = require('../../src/tail/tailLib.js');

const mockReadFile = (expectedFileName, content) => {
  return (fileName, encoding) => {
    assert.equal(fileName, expectedFileName);
    assert.equal(encoding, 'utf8');
    return content;
  };
};

describe('tailMain', () => {
  it('should return tailed content of the given file.', () => {
    const mockedReadFile = mockReadFile('a.txt', 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk');
    const expected = 'b\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    return assert.strictEqual(tailMain(mockedReadFile, 'a.txt'), expected);
  });
});
