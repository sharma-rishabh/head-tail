const tail = (content, count, delimiter) => {
  const splitContent = content.split(delimiter);
  const requiredContent = splitContent.slice(splitContent.length - count);
  return requiredContent.join(delimiter);
};

exports.tail = tail;
