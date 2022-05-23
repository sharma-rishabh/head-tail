const { parseArgs } = require('./parseArgs.js');
const { extractValidOption } = require('./extractValidOption.js');

const splitBy = (content, separator) => content.split(separator);
const joinBy = (array, connector) => array.join(connector);

const extractData = (array, numOfElements) => array.slice(0, numOfElements);

const head = (content, { count: numOfLines, option }) => {
  const separator = option === '-n' ? '\n' : '';
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

const headMain = (readFile, ...args) => {
  const { files, optionsArray } = parseArgs(args);
  const option = extractValidOption(optionsArray);
  assertFileExistence(files);
  const content = getFileContent(readFile, files[0]);
  return head(content, option);
};

exports.extractData = extractData;
exports.splitBy = splitBy;
exports.joinBy = joinBy;
exports.head = head;
exports.headMain = headMain;
exports.getFileContent = getFileContent;
exports.assertFileExistence = assertFileExistence;
