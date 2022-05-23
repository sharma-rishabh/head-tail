const assert = require('assert');
const { extractData, splitBy, joinBy, head, formatOutput } = require('../src/headLib.js');

describe('extractData', () => {
  it('should give array back if array length is equal to specified count.',
    () => {
      const array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
      return assert.deepStrictEqual(extractData(array, 10), array);
    });
  it('should give the array back if length is less than specified count.',
    () => {
      const array = [1];
      return assert.deepStrictEqual(extractData(array, 10), array);
    });
  it('should give all elements back if array length is more than specified count.',
    () => {
      const array =
        ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'];
      const expectedArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
      return assert.deepStrictEqual(extractData(array, 10), expectedArray);
    });
  it('should give the specified number of elements of the given array.',
    () => {
      const array = ['a', 'b'];
      const expectedArray = ['a'];
      return assert.deepStrictEqual(extractData(array, 1), expectedArray);
    }
  );
});

describe('splitBy', () => {
  it('should split content by \n', () => {
    return assert.deepStrictEqual(splitBy('a\nb', '\n'), ['a', 'b']);
  });
  it('should split content by the given separator.', () => {
    return assert.deepStrictEqual(splitBy('a\nb', ''), ['a', '\n', 'b']);
  });
});

describe('joinBy', () => {
  it('should join given array with \n', () => {
    return assert.strictEqual(joinBy(['a', 'b'], '\n'), 'a\nb');
  });
  it('should join content by the given connector.', () => {
    return assert.deepStrictEqual(joinBy(['a', 'b'], ''), 'ab');
  });
});

describe('head', () => {
  it('should give head of an empty file.', () => {
    return assert.strictEqual(
      head('', 10, '\n'), ''
    );
  });
  it('should give same content back if lines are less than given num of lines', () => {
    return assert.strictEqual(
      head('a\nb', 10, '\n'),
      'a\nb'
    );
  });
  it('should give first 10 lines of the file if given num of lines is 10',
    () => {
      const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
      const expectedContent = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj';
      return assert.strictEqual(
        head(content, 10, '\n'), expectedContent
      );
    });
  it('should give required number of lines form a file.',
    () => {
      const content = 'a\nb\nc\nd\ne';
      const expectedContent = 'a\nb';
      return assert.strictEqual(
        head(content, 2, '\n'), expectedContent
      );
    });
  it('should take a separator and should count and split based on that.', () => {
    return assert.strictEqual(head(
      'ab', 1, ''), 'a'
    );
  });
});

describe('formatOutput', () => {
  it('Should add a header to a file content', () => {
    return assert.strictEqual(formatOutput('a\nb', 'a.txt'), '==> a.txt <==\na\nb\n');
  });
});
