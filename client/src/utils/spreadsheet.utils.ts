import * as XLSX from 'xlsx';

export const createJSONFromSpreadsheet = async (document: any) => {
  const data = await document.arrayBuffer();
  const workbook = XLSX.read(data);
  const sheetName: string = workbook.SheetNames[0];
  const worksheet: XLSX.WorkSheet | null = workbook && workbook.Sheets ?
    workbook.Sheets[sheetName as any] : null;

  if (worksheet) {
    return XLSX.utils.sheet_to_json(worksheet);
  }
  return [];
}

export const downloadSpreadsheetFromJSON = async (data: Array<any>) => {
  XLSX.writeFile(workbook, "out.xlsb");
  createFileLink()
}

export const createFileLink = (data: any, pinnedFile: any) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', pinnedFile);
  document.body.appendChild(link);
  link.click();
}