const { parseArgs } = require('./parseArgs.js');
const { extractValidOption } = require('./extractValidOption.js');
const { printContent } = require('./printContent.js');

const splitBy = (content, separator) => content.split(separator);
const joinBy = (array, connector) => array.join(connector);

const extractData = (array, numOfElements) => array.slice(0, numOfElements);

const getSeparator = (option) => option === '-n' ? '\n' : '';

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

const formatOutput = (fileContent, fileName) => {
  return `==> ${fileName} <==\n${fileContent}\n`;
};

const headSingleFile = ([fileName], readFile, { count, option }) => {
  const separator = getSeparator(option);
  const fileContent = getFileContent(readFile, fileName);
  const content = head(fileContent, count, separator);
  return [{ content, isError: false }];
};

const headMultipleFiles = (files, readFile, { option, count }) => {
  const separator = getSeparator(option);
  return files.map((file) => {
    try {
      const fileContent = getFileContent(readFile, file);
      const headedContent = head(fileContent, count, separator);
      const content = formatOutput(headedContent, file);
      return { content, isError: false };
    } catch (error) {
      const content = error.message;
      const isError = true;
      return { content, isError };
    }
  });
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
exports.formatOutput = formatOutput;
exports.headMultipleFiles = headMultipleFiles;
