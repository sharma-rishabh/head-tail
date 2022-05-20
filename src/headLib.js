const { parseArgs } = require('./parseArgs.js');

const splitBy = (content, separator) => content.split(separator);

const joinBy = (array, connector) => array.join(connector);

const extractData = (array, numOfElements) => array.slice(0, numOfElements);

const head = (content, { count: numOfLines, separator }) => {
  const splitContent = splitBy(content, separator);
  const requiredContent = extractData(splitContent, numOfLines);
  return joinBy(requiredContent, separator);
};

const headMain = (readFile, ...args) => {
  const { fileName, options } = parseArgs(args);
  let content;
  try {
    content = readFile(fileName, 'utf8');
  } catch (error) {
    throw {
      name: 'fileReadError',
      message: `cannot open ${fileName}`,
      fileName
    };
  }
  return head(content, options);
};

exports.extractData = extractData;
exports.splitBy = splitBy;
exports.joinBy = joinBy;
exports.head = head;
exports.headMain = headMain;
