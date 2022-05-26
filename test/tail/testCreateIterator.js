const assert = require('assert');
const { createIterator } = require('../../src/tail/createIterator.js');

describe('createIterator', () => {
  it('should return current index of the array', () => {
    const iterableArr = createIterator([1]);
    assert.strictEqual(iterableArr.index, 0);
  });
  it('should return current argument of the array', () => {
    const iterableArr = createIterator([1]);
    assert.strictEqual(iterableArr.currentElement(), 1);
  });
  it('should return next argument of the array', () => {
    const iterableArr = createIterator([1, 2]);
    assert.strictEqual(iterableArr.nextElement(), 2);
    assert.strictEqual(iterableArr.index, 1);
  });
  it('should return rest of arguments of the array', () => {
    const iterableArr = createIterator([1, 2]);
    assert.deepStrictEqual(iterableArr.restOfElements(), [1, 2]);
    assert.strictEqual(iterableArr.nextElement(), 2);
    assert.deepStrictEqual(iterableArr.restOfElements(), [2]);
  });
});
