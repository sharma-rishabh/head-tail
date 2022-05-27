const printContent = (contentArray, log, error) => {
  contentArray.forEach((headOutput) => {
    if (headOutput.isError) {
      error(headOutput.content);
    } else {
      log(headOutput.content);
    }
  });
  // if (contentArray.some((headOutput) => headOutput.isError)) {
  //   throw {
  //     name: 'someFilesDontExist',
  //     message: ''
  //   };
  // }
};

exports.printContent = printContent;
