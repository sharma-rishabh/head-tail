const { splitBy, joinBy } = require('../lib/stringUtils.js');
const { tailParse, readFileError } = require('./parseTail.js');
const { printContent } = require('../lib/printContent.js');

const getExitCode = (headFiles) => {
  return headFiles.some((headFile) => headFile.isError) ? 1 : 0;
};

const startsWithPlus = (string) => string.startsWith('+');
const startsWithHyphen = (string) => string.startsWith('-');

const formatContent = (content, fileName) => {
  return `==>${fileName}<==\n${content}`;
};

const identity = (value) => value;

const getReadError = (errorMessage) => {
  const codeAndMessage = errorMessage.split(': ');
  const message = codeAndMessage[1];
  return message.split(',')[0];
};

const getStartIndex = (content, count) => {
  if (startsWithPlus(count)) {
    return +count === 0 ? +count : +count - 1;
  }
  if (startsWithHyphen(count)) {
    return +count === 0 ? content.length : +count;
  }
  return -count;
};

const extractData = (content, startIndex) => {
  return content.slice(startIndex);
};

const tail = (content, count, delimiter) => {
  const splitContent = splitBy(content, delimiter);
  const startIndex = getStartIndex(splitContent, count);
  const requiredContent = extractData(splitContent, startIndex);
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
    let content;

    try {
      content = getFileContent(readFile, fileName);
    } catch (error) {
      return { content: error.message, isError: true };
    }

    const tailedContent = tail(content, count, delimiter);
    const formattedContent = formatter(tailedContent, fileName);
    return { content: formattedContent, isError: false };
  });
};

const getFormatter = (files) => {
  return files.length > 1 ? formatContent : identity;
};

const compileOptions = (options) =>
  options.length === 0 ? { flag: '-n', count: '10' } : options[0];

const tailMain = (readFile, log, error, ...args) => {
  const { options, files } = tailParse(args);
  const option = compileOptions(options);
  const formatter = getFormatter(files);
  const tailedFiles = tailFile(files, readFile, formatter, option);
  printContent(tailedFiles, log, error);

  return getExitCode(tailedFiles);
};

exports.tail = tail;
exports.extractData = extractData;
exports.tailMain = tailMain;
exports.getFileContent = getFileContent;
exports.tailFile = tailFile;
exports.formatContent = formatContent;
