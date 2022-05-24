const { splitBy, joinBy } = require('../lib/stringUtils.js');

const startsWithPlus = (string) => string.startsWith('+');
const startsWithHyphen = (string) => string.startsWith('-');

const getStartIndex = (content, count) => {
  if (startsWithPlus(count)) {
    return +count === 0 ? +count : +count - 1;
  }
  const elementsToExtract = startsWithHyphen(count) ? -count : +count;
  return content.length - elementsToExtract;
};

const extractData = (content, count) => {
  const startIndex = getStartIndex(content, count);
  return content.slice(startIndex);
};

const tail = (content, count, delimiter) => {
  const splitContent = splitBy(content, delimiter);
  const requiredContent = extractData(splitContent, count);
  return joinBy(requiredContent, delimiter);
};

exports.tail = tail;
exports.extractData = extractData;
