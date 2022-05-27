const { parseArgs } = require('./parseArgs.js');
const { extractValidOption } = require('./extractValidOption.js');
const { printContent } = require('../lib/printContent.js');
const { splitBy, joinBy } = require('../lib/stringUtils.js');
const { noFile, fileReadError } = require('./throwFunctions.js');

const getExitCode = (headFiles) => {
  return headFiles.some((headFile) => headFile.isError) ? 1 : 0;
};

const extractData = (array, numOfElements) => array.slice(0, +numOfElements);

const getSeparator = (option) => option === '-n' ? '\n' : '';

const identity = (content) => content;

const head = (content, numOfLines, separator) => {
  const splitContent = splitBy(content, separator);
  const requiredContent = extractData(splitContent, numOfLines);
  return joinBy(requiredContent, separator);
};

const assertFileExistence = (files) => {
  if (files.length === 0) {
    throw noFile();
  }
  return true;
};

const formatOutput = (fileContent, fileName) => {
  return `==> ${fileName} <==\n${fileContent}\n`;
};

const headMultipleFiles = (files, readFile, { option, count }, formatter) => {
  const separator = getSeparator(option);
  return files.map((file) => {
    let fileContent;

    try {
      fileContent = getFileContent(readFile, file);
    } catch (error) {
      const content = error.message;
      const isError = true;
      return { content, isError };
    }

    const headedContent = head(fileContent, count, separator);
    const content = formatter(headedContent, file);
    return { content, isError: false };
  });
};

const getFileContent = (readFile, fileName) => {
  try {
    return readFile(fileName, 'utf8');
  } catch (error) {
    throw fileReadError(fileName);
  }
};

const headMain = (readFile, log, error, ...args) => {
  const { files, options } = parseArgs(args);
  const option = extractValidOption(options);

  assertFileExistence(files);

  const formatter = files.length > 1 ? formatOutput : identity;
  const headFiles = headMultipleFiles(files, readFile, option, formatter);

  printContent(headFiles, log, error);

  return getExitCode(headFiles);
};

exports.extractData = extractData;
exports.head = head;
exports.headMain = headMain;
exports.getSeparator = getSeparator;
exports.getFileContent = getFileContent;
exports.assertFileExistence = assertFileExistence;
exports.headMultipleFiles = headMultipleFiles;
exports.formatOutput = formatOutput;
