export const updateComparisonColumns = (comparisonColumns: Array<string>, updatedCol: string) => {
  let newValue: Array<string> = [];
  const indexOfCol = comparisonColumns.indexOf(updatedCol);
  if (indexOfCol === -1) {
    newValue = [...comparisonColumns, updatedCol];
  } else {
    newValue = [...comparisonColumns];
    newValue.splice(indexOfCol, 1);
  }
  return newValue;
}

export const addMessageToErrorList = (
  errorList: Array<string>,
  errorMessage: string,
) => {
  const errMsgIndex = errorList.indexOf(errorMessage);
  if (errMsgIndex === -1) errorList.push(errorMessage);
}

export const removeMessageFromErrorList = (
  errorList: Array<string>,
  errorMessage: string,
) => {
  const errMsgIndex = errorList.indexOf(errorMessage);
  if (errMsgIndex > -1) errorList.splice(errMsgIndex, 1);
}