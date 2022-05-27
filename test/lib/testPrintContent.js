const assert = require('assert');
const { printContent } = require('../../src/lib/printContent.js');

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

describe('printContent', () => {
  it('should print content of only one file', () => {
    const mockedLog = mockLogger(['some content']);
    const mockedError = mockLogger(['some content']);

    printContent(
      [{ content: 'some content', isError: false }],
      mockedLog,
      mockedError
    );

    assert.strictEqual(mockedLog.count, 1);
  });

  it('should print content of multiple file', () => {
    const mockedLog = mockLogger(['some content', 'abc.txt']);
    const mockedError = mockLogger(['some content']);

    printContent(
      [
        { content: 'some content', isError: false },
        { content: 'abc.txt', isError: false }
      ],
      mockedLog,
      mockedError
    );

    assert.strictEqual(mockedLog.count, 2);
  });

  it('should print error on error stream.', () => {
    const mockedLog = mockLogger(['some content', 'abc.txt']);
    const mockedError = mockLogger(['error content']);

    printContent(
      [
        { content: 'some content', isError: false },
        { content: 'error content', isError: true }
      ],
      mockedLog,
      mockedError
    );

    assert.ok(mockedLog.count === 1 && mockedError.count === 1);
  });
});

