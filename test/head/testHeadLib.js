const assert = require('assert');
const { extractData, head } = require('../../src/head/headLib.js');

describe('extractData', () => {
  it('should give array back if array length is equal to specified count.',
    () => {
      const array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
      assert.deepStrictEqual(extractData(array, '10'), array);
    });

  it('should work if length is less than specified count.', () => {
    const array = [1];
    assert.deepStrictEqual(extractData(array, '10'), array);
  });

  it('should work if array length is more than specified count.', () => {
    const array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'];
    const expectedArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    assert.deepStrictEqual(extractData(array, '10'), expectedArray);
  });

  it('should give the specified number of elements of the given array.',
    () => {
      const array = ['a', 'b'];
      const expectedArray = ['a'];
      assert.deepStrictEqual(extractData(array, '1'), expectedArray);
    }
  );
});

describe('head', () => {
  it('should give head of an empty file.', () => {
    assert.strictEqual(
      head('', '10', '\n'),
      ''
    );
  });

  it('should work if lines are less than given num of lines', () => {
    assert.strictEqual(
      head('a\nb', '10', '\n'),
      'a\nb'
    );
  });

  it('should work if given num of lines is 10', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expectedContent = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj';
    assert.strictEqual(
      head(content, '10', '\n'),
      expectedContent
    );
  });

  it('should give required number of lines form a file.', () => {
    const content = 'a\nb\nc\nd\ne';
    const expectedContent = 'a\nb';
    assert.strictEqual(
      head(content, '2', '\n'),
      expectedContent
    );
  });

  it('should work with the provided separator.', () => {
    assert.strictEqual(
      head('ab', '1', ''),
      'a'
    );
  });
});
