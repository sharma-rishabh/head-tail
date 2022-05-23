const assert = require('assert');
const { printContent } = require('../src/printContent.js');

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

const mockError = (contents) => {
  let index = 0;
  const error = (content) => {
    assert.equal(content, contents[index]);
    error.count++;
    index++;
  };
  error.count = 0;
  return error;
};

describe('printContent', () => {
  it('should print content of only one file', () => {
    const mockedLog = mockLogger(['some content']);
    const mockedError = mockError(['some content']);
    return assert.strictEqual(printContent([{ content: 'some content', isError: false }], mockedLog, mockedError), undefined);
  });
  it('should print content of multiple file', () => {
    const mockedLog = mockLogger(['some content', 'abc.txt']);
    const mockedError = mockError(['some content']);
    return assert.strictEqual(printContent([{ content: 'some content', isError: false }, { content: 'abc.txt', isError: false }], mockedLog, mockedError), undefined);
  });
  it('should print content of multiple file and put error on error stream',
    () => {
      const mockedLog = mockLogger(['abc.txt']);
      const mockedError = mockError(['some content']);
      const actual = [{ content: 'some content', isError: true }, { content: 'abc.txt', isError: false }];
      return assert.throws(() => printContent(actual, mockedLog, mockedError));
    });
});

