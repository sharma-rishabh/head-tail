const { splitBy, joinBy } = require('../lib/stringUtils.js');
const { tailParse, readFileError } = require('./parseTail.js');
const { printContent } = require('../lib/printContent.js');

const getExitCode = (headFiles) => {
  return headFiles.some((headFile) => headFile.isError) ? 1 : 0;
};

const isPositive = (string) => string.startsWith('+');
const startsWithHyphen = (string) => string.startsWith('-');

const getNegativeStartIndex = (count) => {
  if (+count === 0) {
    return Infinity;
  }
  return startsWithHyphen(count) ? +count : -count;
};

const getPositiveIndex = (count) => {
  return +count === 0 ? 0 : +count - 1;
};

const getStartIndex = (count) =>
  isPositive(count) ? getPositiveIndex(count) : getNegativeStartIndex(count);

const formatContent = (content, fileName) => {
  return `==>${fileName}<==\n${content}`;
};

const identity = (value) => value;

const getFormatter = (files) => {
  return files.length > 1 ? formatContent : identity;
};

const lastNLines = (content, startIndex) => {
  const lines = splitBy(content, '\n');
  const requiredLines = lines.slice(startIndex);
  return joinBy(requiredLines, '\n');
};

const lastNBytes = (content, startIndex) => {
  const lines = splitBy(content, '');
  const requiredLines = lines.slice(startIndex);
  return joinBy(requiredLines, '');
};

const getReadError = (errorMessage) => {
  const codeAndMessage = errorMessage.split(': ');
  const message = codeAndMessage[1];
  return message.split(',')[0];
};

const getSlicer = (flag) => flag === '-n' ? lastNLines : lastNBytes;

const getFileContent = (readFile, fileName) => {
  try {
    return readFile(fileName, 'utf8');
  } catch (error) {
    const message = getReadError(error.message);
    throw readFileError(fileName, message);
  }
};

const tailFile = (files, readFile, formatter, option) => {
  const slicer = getSlicer(option.flag);
  const startIndex = getStartIndex(option.count);

  return files.map((fileName) => {
    let content;

    try {
      content = getFileContent(readFile, fileName);
    } catch (error) {
      return { content: error.message, isError: true };
    }

    const tailedContent = slicer(content, startIndex);
    const formattedContent = formatter(tailedContent, fileName);
    return { content: formattedContent, isError: false };
  });
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

exports.tailMain = tailMain;
exports.getFileContent = getFileContent;
exports.tailFile = tailFile;
exports.formatContent = formatContent;
exports.lastNLines = lastNLines;
exports.lastNBytes = lastNBytes;
