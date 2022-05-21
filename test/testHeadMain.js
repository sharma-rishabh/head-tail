const { headMain, getFileContent } = require('../src/headLib.js');
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
  it('should throw an error if file is not present.', () => {
    const mockedReadFile = mockReadFile('a.txt', 'a\nb\nc');
    return assert.throws(() => headMain(mockedReadFile, 'b.txt'), {
      name: 'fileReadError', message: 'head: b.txt: No such file or directory', fileName: 'b.txt'
    });
  });
  it('should throw an error if no arguments are present.', () => {
    const mockedReadFile = mockReadFile('a.txt', 'a\nb\nc');
    return assert.throws(() => headMain(mockedReadFile), {
      name: 'noArguments',
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    });
  });
});

describe('getFileContent', () => {
  it('should return file content if file exists.', () => {
    const mockedReadFile = mockReadFile('a.txt', 'a\nb\nc');
    return assert.strictEqual(getFileContent(mockedReadFile, 'a.txt'), 'a\nb\nc');
  });
  it('should throw error if file is invalid.', () => {
    const mockedReadFile = mockReadFile('a.txt', 'a\nb\nc');
    return assert.throws(() => getFileContent(mockedReadFile, 'b.txt'), {
      name: 'fileReadError', message: 'head: b.txt: No such file or directory', fileName: 'b.txt'
    });
  });
});
