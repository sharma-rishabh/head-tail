const splitBy = (content, separator) => content.split(separator);

const joinBy = (array, connector) => array.join(connector);

const extractData = (array, numOfElements) => array.slice(0, numOfElements);

const head = (content, { count: numOfLines, separator }) => {
  const splitContent = splitBy(content, separator);
  const requiredContent = extractData(splitContent, numOfLines);
  return joinBy(requiredContent, separator);
};

const headMain = (readFile, fileName) => {
  const content = readFile(fileName, 'utf8');
  return head(content, { count: 10, separator: '\n' });
};

exports.extractData = extractData;
exports.splitBy = splitBy;
exports.joinBy = joinBy;
exports.head = head;
exports.headMain = headMain;
