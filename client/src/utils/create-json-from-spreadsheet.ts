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