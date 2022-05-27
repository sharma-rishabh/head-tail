const printContent = (contents, log, error) => {
  contents.forEach((content) => {
    if (content.isError) {
      error(content.content);
    } else {
      log(content.content);
    }
  });
};

exports.printContent = printContent;
