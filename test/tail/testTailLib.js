const assert = require('assert');
const { lastNLines, lastNBytes } = require('../../src/tail/tailLib.js');

describe('lastNLines', () => {
  it('should give same content if  index is same as content length.', () => {
    assert.strictEqual(lastNLines('a', 0), 'a');
  });

  it('should give last lines starting from index if it is positive.', () => {
    assert.strictEqual(lastNLines('a\nb\nc', 1), 'b\nc');
  });

  it('should give last n lines of content if index is negative.', () => {
    assert.strictEqual(lastNLines('a\nb\nc', -1), 'c');
  });

  it('should give last no lines if index is Infinity.', () => {
    assert.strictEqual(lastNLines('a\nb\nc', Infinity), '');
  });
});

describe('lastNBytes', () => {
  it('should give same content if  index is same as content length.', () => {
    assert.strictEqual(lastNBytes('a', 0), 'a');
  });

  it('should give last chars starting from index if it is positive.', () => {
    assert.strictEqual(lastNBytes('a\nb\nc', 1), '\nb\nc');
  });

  it('should give last n chars of content if index is negative.', () => {
    assert.strictEqual(lastNBytes('a\nb\nc', -1), 'c');
  });

  it('should give last no chars if index is Infinity.', () => {
    assert.strictEqual(lastNBytes('a\nb\nc', Infinity), '');
  });
});
