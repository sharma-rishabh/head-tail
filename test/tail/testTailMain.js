const assert = require('assert');
const { tailMain, getFileContent, tailFile, formatContent } = require('../../src/tail/tailLib.js');

const mockReadFile = (expectedFileName, content) => {
  return (fileName, encoding) => {
    try {
      assert.equal(fileName, expectedFileName);
      assert.equal(encoding, 'utf8');
    } catch (error) {
      throw {
        message: `ENOENT: no such file or directory, open '${fileName}'`
      };
    }
    return content;
  };
};

const mockRFSMultiFile = (expectedFiles, contents) => {
  let index = 0;
  return (fileName, encoding) => {
    try {
      assert.equal(fileName, expectedFiles[index]);
      assert.equal(encoding, 'utf8');
    } catch (error) {
      throw {
        message: `ENOENT: no such file or directory, open '${fileName}'`
      };
    }
    const content = contents[index];
    index++;
    return content;
  };
};

const mockLogger = (contents) => {
  let index = 0;
  const log = (content) => {
    assert.equal(content, contents[index]);
    log.count++;
    index++;
  };
  log.count = 0;
  return log;
};

describe('tailMain', () => {
  it('should return tailed content of the given file.', () => {
    const mockedReadFile = mockReadFile('a.txt', 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk');
    const mockedLog = mockLogger(['b\nc\nd\ne\nf\ng\nh\ni\nj\nk']);
    const mockedError = mockLogger([]);
    assert.strictEqual(tailMain(mockedReadFile, mockedLog, mockedError, 'a.txt'), undefined);
  });
  it('should use given options to tail the given file.', () => {
    const mockedReadFile = mockRFSMultiFile(['a.txt', 'b.txt'], ['a\nb', 'a\nc']);
    const mockedLog = mockLogger(['==>a.txt<==\nb', '==>b.txt<==\nc']);
    const mockedError = mockLogger([]);
    assert.strictEqual(tailMain(mockedReadFile, mockedLog, mockedError, '-n', '1', 'a.txt', 'b.txt'), undefined);
  });
});

describe('getFileContent', () => {
  it('should return content if file exist.', () => {
    const mockedReadFile = mockReadFile('a.txt', 'abc');
    assert.strictEqual(getFileContent(mockedReadFile, 'a.txt'), 'abc');
  });
  it('should throw error if file doesn\'t exist.', () => {
    const mockedReadFile = mockReadFile('a.txt', 'abc');
    assert.throws(() => getFileContent(mockedReadFile, 'b.txt'), {
      name: 'readFileError',
      message: 'tail: b.txt:no such file or directory',
      fileName: 'b.txt'
    });
  });
});

describe('tailFile', () => {
  it('should tail the content of a single file.', () => {
    const mockedRFS = mockRFSMultiFile(['a.txt'], ['1\n2\n3\n4\n5\n6']);
    const identity = (value) => value;
    const option = { flag: '-n', count: '6' };
    assert.deepStrictEqual(tailFile(['a.txt'], mockedRFS, identity, option), [{ content: '1\n2\n3\n4\n5\n6', isError: false }]);
  });
  it('should tail store error if the given file doesn\'t exist.', () => {
    const mockedRFS = mockRFSMultiFile(['b.txt'], ['1\n2\n3\n4\n5\n6']);
    const identity = (value) => value;
    const option = { flag: '-n', count: '10' };
    assert.deepStrictEqual(tailFile(['a.txt'], mockedRFS, identity, option), [{ content: 'tail: a.txt:no such file or directory', isError: true }]);
  });
  it('should tail the content of and save error for multiple files.', () => {
    const mockedRFS = mockRFSMultiFile(['a.txt'], ['1\n2\n3\n4\n5\n6']);
    const identity = (value) => value;
    const option = { flag: '-n', count: '6' };
    assert.deepStrictEqual(tailFile(['a.txt', 'b.txt'], mockedRFS, identity, option), [{ content: '1\n2\n3\n4\n5\n6', isError: false }, { content: 'tail: b.txt:no such file or directory', isError: true }]);
  });
  it('should tail and format the content of a single file.', () => {
    const mockedRFS = mockRFSMultiFile(['a.txt'], ['1\n2']);
    const option = { flag: '-n', count: '6' };
    assert.deepStrictEqual(tailFile(['a.txt'], mockedRFS, formatContent, option), [{ content: '==>a.txt<==\n1\n2', isError: false }]);
  });
});

describe('formatContent', () => {
  it('should format the given content.', () => {
    assert.strictEqual(formatContent('abc', 'a.txt'), '==>a.txt<==\nabc');
  });
});
