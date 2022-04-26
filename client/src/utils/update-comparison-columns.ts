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