const assert = require('assert');
const { assertFileExistence, getFileContent, headSingleFile, headMultipleFiles, formatOutput } = require('../src/headLib.js');

const mockReadFile = (expectedFileName, content) => {
  return (fileName, encoding) => {
    assert.strictEqual(fileName, expectedFileName);
    assert.strictEqual(encoding, 'utf8');
    return content;
  };
};

const mockRFSMultiFile = (expectedFiles, contents) => {
  let index = 0;
  return (fileName, encoding) => {
    assert.equal(fileName, expectedFiles[index]);
    assert.equal(encoding, 'utf8');
    const content = contents[index];
    index++;
    return content;
  };
};

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

describe('assertFileExistence', () => {
  it('should not throw an error if there are files in fileArray.', () => {
    return assert.ok(assertFileExistence(['a.txt']));
  });
  it('should throw an error if there are no files in fileArray.', () => {
    return assert.throws(() => assertFileExistence([]), {
      name: 'noFile',
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    });
  });
});

describe('headSingleFile', () => {
  it('should return head of a single file.', () => {
    const mockedReadFile = mockReadFile('a.txt', '1\n2\n3');
    const option = { option: '-n', count: 2 };
    return assert.deepStrictEqual(headSingleFile(['a.txt'], mockedReadFile, option), [{ content: '1\n2', isError: false }]);
  });
  it('should return error if file doesn\'t exist.', () => {
    const mockedReadFile = mockReadFile('a.txt', '1\n2\n3');
    const option = { option: '-n', count: 2 };
    return assert.throws(() => headSingleFile(['b.txt'], mockedReadFile, option));
  });
});

describe('headMultipleFiles', () => {
  it('should do head of multiple files', () => {
    const mockedReadFile = mockRFSMultiFile(['a.txt', 'b.txt'], ['a\nb', 'a']);
    const files = ['a.txt', 'b.txt'];
    const expected = [
      { content: '==> a.txt <==\na\nb\n', isError: false },
      { content: '==> b.txt <==\na\n', isError: false }
    ];
    const option = { option: '-n', count: 10 };
    return assert.deepStrictEqual(headMultipleFiles(files, mockedReadFile, option, formatOutput), expected);
  });
  it('should do head of multiple files and give error if some files don\'t exist', () => {
    const mockedReadFile = mockRFSMultiFile(['a.txt', 'b.txt'], ['a\nb', 'a']);
    const files = ['a.txt', 'c.txt', 'b.txt'];
    const expected = [
      { content: '==> a.txt <==\na\nb\n', isError: false },
      { content: 'head: c.txt: No such file or directory', isError: true },
      { content: '==> b.txt <==\na\n', isError: false }
    ];
    const option = { option: '-n', count: 10 };
    return assert.deepStrictEqual(headMultipleFiles(files, mockedReadFile, option, formatOutput), expected);
  });
});

describe('formatOutput', () => {
  it('Should add a header to a file content', () => {
    return assert.strictEqual(formatOutput('a\nb', 'a.txt'), '==> a.txt <==\na\nb\n');
  });
});
