const { splitBy, joinBy } = require('../lib/stringUtils.js');
const { tailParse, readFileError } = require('./parseTail.js');

const getReadError = (errorMessage) => {
  const codeAndMessage = errorMessage.split(': ');
  const message = codeAndMessage[1];
  return message.split(',')[0];
};

const startsWithPlus = (string) => string.startsWith('+');
const startsWithHyphen = (string) => string.startsWith('-');

const getStartIndex = (content, count) => {
  if (startsWithPlus(count)) {
    return +count === 0 ? +count : +count - 1;
  }
  if (startsWithHyphen(count)) {
    return +count === 0 ? content.length : +count;
  }
  return -count;
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

const getDelimiter = (flag) => flag === '-n' ? '\n' : '';

const getFileContent = (readFile, fileName) => {
  try {
    return readFile(fileName, 'utf8');
  } catch (error) {
    const message = getReadError(error.message);
    throw readFileError(fileName, message);
  }
};

const tailFile = (files, readFile, formatter, option) => {
  const delimiter = getDelimiter(option.flag);
  const count = option.count;
  return files.map((fileName) => {
    try {
      const content = getFileContent(readFile, fileName);
      const tailedContent = tail(content, count, delimiter);
      const formattedContent = formatter(tailedContent);
      return { content: formattedContent, isError: false };
    } catch (error) {
      return { content: error.message, isError: true };
    }
  });
};

const compileOptions = (options) =>
  options.length === 0 ? { flag: '-n', count: '10' } : options[0];

const tailMain = (readFile, ...args) => {
  const { options, files } = tailParse(args);
  const { flag, count } = compileOptions(options);
  const fileName = files[0];
  const content = readFile(fileName, 'utf8');
  return tail(content, count, getDelimiter(flag));
};

exports.tail = tail;
exports.extractData = extractData;
exports.tailMain = tailMain;
exports.getFileContent = getFileContent;
exports.tailFile = tailFile;
