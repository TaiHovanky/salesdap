import { WorkSheet, WorkBook, utils, read, writeFile } from 'xlsx';

export const createJSONFromSpreadsheet = async (document: any) => {
  const data = await document.arrayBuffer();
  const workbook = read(data);
  const sheetName: string = workbook.SheetNames[0];
  const worksheet: WorkSheet | null = workbook && workbook.Sheets ?
    workbook.Sheets[sheetName as any] : null;

  if (worksheet) {
    return utils.sheet_to_json(worksheet);
  }
  return [];
}

export const downloadSpreadsheetFromJSON = async (data: Array<any>) => {
  const worksheetData: Array<Array<any>> = [];
  data.forEach((row: any) => {
    const rowArr = Array.from(Object.keys(row)).map((rowProp: string) => row[rowProp]);
    worksheetData.push(rowArr);
  });
  const worksheet: WorkSheet = utils.aoa_to_sheet(worksheetData);
  const workbook: WorkBook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  writeFile(workbook, 'salesdap-results.xls');
  // XLSX.writeFile(workbook, "out.xlsb");
  // createFileLink()
}

export const createFileLink = (data: any, pinnedFile: any) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', pinnedFile);
  document.body.appendChild(link);
  link.click();
}