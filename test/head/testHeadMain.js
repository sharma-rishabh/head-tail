const { headMain } = require('../../src/head/headLib.js');
const assert = require('assert');

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

describe('headMain', () => {
  it('should take file from main and pass the content to head.', () => {
    const mockedReadFile = mockReadFile('a.txt', 'a\nb');
    const mockedLog = mockLogger(['a\nb']);
    const mockedError = mockLogger([]);

    const actual = headMain(mockedReadFile, mockedLog, mockedError, 'a.txt');

    assert.strictEqual(actual, 0);
  });

  it('should take cl options and parse them as options object.', () => {
    const mockedReadFile = mockReadFile('a.txt', 'a\nb\nc');
    const mockedLog = mockLogger(['a\nb']);
    const mockedError = mockLogger([]);
    const actual = headMain(
      mockedReadFile,
      mockedLog,
      mockedError,
      '-n', '2', 'a.txt'
    );

    assert.strictEqual(actual, 0);
  });

  it('should take multiple files and apply head on them.', () => {
    const mockedReadFile = mockRFSMultiFile(['a.txt', 'b.txt'], ['a\nb', 'a']);
    const mockedLog = mockLogger(
      [
        '==> a.txt <==\na\nb\n',
        '==> b.txt <==\na\n'
      ]
    );
    const mockedError = mockLogger([]);
    const actual = headMain(
      mockedReadFile,
      mockedLog,
      mockedError,
      '-n', '2', 'a.txt', 'b.txt'
    );

    assert.strictEqual(actual, 0);
  });

  it('should throw an error if file is not present.', () => {
    const mockedReadFile = mockReadFile('a.txt', 'a\nb\nc');
    const mockedLog = mockLogger([]);
    const mockedError = mockLogger(['head: b.txt: No such file or directory']);

    assert.strictEqual(
      headMain(mockedReadFile, mockedLog, mockedError, 'b.txt'),
      1
    );
  });

  it('should throw an error if no files are present.', () => {
    const mockedReadFile = mockReadFile('a.txt', 'a\nb\nc');
    const expectedError = {
      name: 'noFile',
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    };
    assert.throws(() => headMain(mockedReadFile), expectedError);
  });
});
