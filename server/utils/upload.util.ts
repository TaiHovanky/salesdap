import * as XLSX from 'xlsx';
/* load 'fs' for readFile and writeFile support */
import * as fs from 'fs';

export const createJSONFromWorksheet = (req: any): Array<any> => {
  const fileBuffer = fs.readFileSync(req.file.path);
  const workbook: XLSX.WorkBook = XLSX.read(fileBuffer);
  const sheetName: string = workbook.SheetNames[0];
  const worksheet: XLSX.WorkSheet | null = workbook && workbook.Sheets ?
    workbook.Sheets[sheetName as any] : null;

  if (worksheet) {
    return XLSX.utils.sheet_to_json(worksheet);
  }
  return [];
};

export const findDuplicates = (salesData: Array<any>, columnName: string): Array<any> => {
  const valueHash: any = {};
  const result: Array<any> = [];
  salesData.forEach((row: any) => {
    const parsedRow: any = row;
    if (!valueHash.hasOwnProperty([parsedRow[columnName]])) {
      valueHash[parsedRow[columnName]] = parsedRow[columnName];
    } else {
      result.push(parsedRow);
    }
  });
  return result;
} 