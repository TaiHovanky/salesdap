import { WorkSheet, WorkBook, utils, read, writeFile, write } from 'xlsx';
import axios from 'axios';
import { getAccessToken } from './access-token.utils';

export const createJSONFromSpreadsheet = async (document: any) => {
  const data = await document.arrayBuffer();
  const workbook = read(data);
  const sheetName: string = workbook.SheetNames[0];
  const worksheet: WorkSheet | null = workbook && workbook.Sheets ?
    workbook.Sheets[sheetName as any] : null;

  if (worksheet) {
    return utils.sheet_to_json(worksheet, { defval: '' });
  }
  return [];
}

export const downloadSpreadsheetFromJSON = async (data: Array<any>) => {
  const worksheetData: Array<Array<any>> = [];
  let columns: Array<string> = [];
  data.forEach((row: any, index: number) => {
    if (index === 0) {
      columns = Array.from(Object.keys(row));
      worksheetData.push(columns);
    }
    const rowArr = columns.map((rowProp: string) => row[rowProp]);
    worksheetData.push(rowArr);
  });
  const worksheet: WorkSheet = utils.aoa_to_sheet(worksheetData);
  const workbook: WorkBook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  writeFile(workbook, 'account-mapping.xls');
}

export const createWorkbookBLOBFromUnformattedList = (unformattedData: string, columnName: string) => {
  const dataArray: Array<string> = unformattedData.split('\n');
  const dataObjList: Array<any> = dataArray.map((item: any) => {
    return { [columnName]: item };
  });
  const worksheet: WorkSheet = utils.json_to_sheet(dataObjList);

  const workbook: WorkBook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const wbout = write(workbook, { bookType: 'xlsx', type: 'array' });

  /* prepare data for POST */
  return new Blob([new Uint8Array(wbout)], {type: 'application/octet-stream'});
}

export const createFileLink = (data: any, pinnedFileName: string) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', pinnedFileName);
  document.body.appendChild(link);
  link.click();
}

export const getPinnedFile = (pinnedFileId: string) => {
  return axios.get('http://localhost:3001/api/v1/viewpinnedfile',
    {
      responseType: 'blob',
      params: { pinnedFileId },
      headers: {
        Authorization: `Bearer ${getAccessToken()}` //the token is a variable which holds the token
      }
    }
  );
}