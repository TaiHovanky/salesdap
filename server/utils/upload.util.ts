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
  let result: Array<any> = [];
  salesData.forEach((row: any) => {
    const cellValue: string = row[columnName];
    if (cellValue) {
      const sanitizedCellValue: string = cellValue.toLowerCase().trim();
      if (!valueHash.hasOwnProperty(sanitizedCellValue)) {
        valueHash[sanitizedCellValue] = [row];
      } else {
        valueHash[sanitizedCellValue].push(row);
      }
    }
  });
  const valueHashKeys: Array<string> = Array.from(Object.keys(valueHash));
  valueHashKeys.forEach((key: string) => {
    if (valueHash[key].length > 1) {
      result = [...result, ...valueHash[key]];
    }
  });
  console.log('result', result);
  return result;
} 