const splitBy = (content, separator) => content.split(separator);

const joinBy = (array, connector) => array.join(connector);

const extractData = (array, numOfElements) => array.slice(0, numOfElements);

const head = (content, numOfLines) => {
  const splitContent = splitBy(content, '\n');
  const requiredContent = extractData(splitContent, numOfLines);
  return joinBy(requiredContent, '\n');
};

const headMain = (readFile, fileName) => {
  const content = readFile(fileName, 'utf8');
  return head(content, 10);
};

exports.extractData = extractData;
exports.splitBy = splitBy;
exports.joinBy = joinBy;
exports.head = head;
exports.headMain = headMain;
