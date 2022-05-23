const { parseArgs } = require('./parseArgs.js');
const { extractValidOption } = require('./extractValidOption.js');
const { printContent } = require('./printContent.js');

const splitBy = (content, separator) => content.split(separator);
const joinBy = (array, connector) => array.join(connector);

const extractData = (array, numOfElements) => array.slice(0, numOfElements);

const head = (content, numOfLines, separator) => {
  const splitContent = splitBy(content, separator);
  const requiredContent = extractData(splitContent, numOfLines);
  return joinBy(requiredContent, separator);
};

const assertFileExistence = (fileArray) => {
  if (fileArray.length === 0) {
    throw {
      name: 'noFile',
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    };
  }
  return true;
};

const headSingleFile = ([fileName], readFile, { count, option }) => {
  const separator = option === '-n' ? '\n' : '';
  const fileContent = getFileContent(readFile, fileName);
  const content = head(fileContent, count, separator);
  return [{ content, isError: false }];
};

const getFileContent = (readFile, fileName) => {
  try {
    return readFile(fileName, 'utf8');
  } catch (error) {
    throw {
      name: 'fileReadError',
      message: `head: ${fileName}: No such file or directory`,
      fileName
    };
  }
};

const headMain = (readFile, log, error, ...args) => {
  const { files, optionsArray } = parseArgs(args);
  const option = extractValidOption(optionsArray);
  assertFileExistence(files);
  const headedContent = headSingleFile(files, readFile, option);
  printContent(headedContent, log, error);
};

exports.extractData = extractData;
exports.splitBy = splitBy;
exports.joinBy = joinBy;
exports.head = head;
exports.headMain = headMain;
exports.getFileContent = getFileContent;
exports.assertFileExistence = assertFileExistence;
exports.headSingleFile = headSingleFile;
