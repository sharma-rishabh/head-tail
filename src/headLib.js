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
  const { files: [fileName], optionsArray } = parseArgs(args);
  const content = getFileContent(readFile, fileName);
  return head(content, extractValidOption(optionsArray));
};

exports.extractData = extractData;
exports.splitBy = splitBy;
exports.joinBy = joinBy;
exports.head = head;
exports.headMain = headMain;
exports.getFileContent = getFileContent;
