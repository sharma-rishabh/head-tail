const splitBy = (content) => content.split('\n');

const joinBy = (array) => array.join('\n');

const extractData = (array, numOfElements) => array.slice(0, numOfElements);

const head = (content, numOfLines) => {
  const splitContent = splitBy(content);
  const requiredContent = extractData(splitContent, numOfLines);
  return joinBy(requiredContent);
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
