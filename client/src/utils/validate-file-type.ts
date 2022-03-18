const acceptedFileTypes = ['xls', 'xlsx', 'csv'];

export const checkIsValidFileType = (fileName: string): boolean => {
  const fileNameArray: Array<string> = fileName.split('.');
  const fileExtension: string = fileNameArray[fileNameArray.length - 1];
  return acceptedFileTypes.includes(fileExtension.toLowerCase());
}