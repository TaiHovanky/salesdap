/* load 'fs' for readFile and writeFile support */
import * as fs from 'fs';
import AWS from 'aws-sdk';

export const parseJSONFromFile = (file: any): Array<any> => {
  const fileBuffer = fs.readFileSync(file);
  if (fileBuffer) {
    return JSON.parse(fileBuffer.toString());
  }
  return [];
};

/**
 * Loop through spreadsheet data and use comparison columns to find duplicate values. If
 * a duplicate value is found, both rows from each spreadsheet are added to the results.
 * @param {Array<any>} salesData1 Spreadsheet data in the form of an array
 * @param {Array<any>} salesData2 Spreadsheet data in the form of an array
 * @param {string} comparisonColumn1 Column that will be compared to comparisonColumn2
 * @param {string} comparisonColumn2 
 * @returns List of rows with duplicate data in the comparison columns
 */
export const findDuplicates = (
  salesData1: Array<any>,
  salesData2: Array<any>,
  comparisonColumn1: string,
  comparisonColumn2: string
): Array<any> => {
  const valueHash: any = {};
  let resultsList: Array<any> = [];

  loopThroughSpreadsheet(
    salesData1,
    comparisonColumn1,
    valueHash,
    resultsList,
    addCellValueToHash
  );
  loopThroughSpreadsheet(
    salesData2,
    comparisonColumn2,
    valueHash,
    resultsList,
    checkForDuplicates
  );

  return resultsList;
} 

/**
 * Loop through each row in spreadsheet while examining the cell in the comparison column
 * and execute a callback on that cell
 * @param {Array<any>} salesData Spreadsheet data
 * @param {string} comparisonColumn Column that we want cell values for
 * @param {any} valueHash Object containing cell value as key, spreadsheet row as value
 * @param {Array<any>} resultsList List of rows that contain duplicate values
 * @param callback Function that updates results in some way
 */
const loopThroughSpreadsheet = (
  salesData: Array<any>,
  comparisonColumn: string,
  valueHash: any,
  resultsList: Array<any>,
  callback: any
): void => {
  salesData.forEach((row: any) => {
    const cellValue: string = row[comparisonColumn];
    if (cellValue) {
      const sanitizedCellValue: string = cellValue.toLowerCase().trim();
      callback(sanitizedCellValue, valueHash, row, resultsList);
    }
  });
}

/**
 * Update the value hash
 * @param {string} cellValue Cell in the row/column
 * @param {any} valueHash Object containing cell value as key, spreadsheet row as value
 * @param {any} row Object that represents a row in the spreadsheet
 */
const addCellValueToHash = (cellValue: string, valueHash: any, row: any): void => {
  if (!valueHash.hasOwnProperty(cellValue)) {
    valueHash[cellValue] = row;
  }
}

/**
 * Compare the cell with the valueHash to see if there's a match with the data from the
 * other spreadsheet
 * @param {string} cellValue Cell in the row/column
 * @param {any} valueHash Object containing cell value as key, spreadsheet row as value
 * @param {any} row Object that represents a row in the spreadsheet
 * @param {Array<any>} resultsList List of rows that contain duplicate values
 */
const checkForDuplicates = (
  cellValue: string,
  valueHash: any,
  row: any,
  resultsList: Array<any>,
): void => {
  if (valueHash[cellValue]) {
    resultsList.push({ ...valueHash[cellValue], ...row});
  }
}

/**
 * Create an array of objects that contain the desired columns from each spreadsheet.
 * @param duplicatesList List of rows that have a duplicate cell value in the comparison columns
 * @param resultColumns1 Columns from the 1st spreadsheet that user wants to see in results
 * @param resultColumns2 Columns from the 2nd spreadsheet that user wants to see in results
 * @returns Array of objects that contains properties for desired columns
 */
export const displayRelevantColumns = (
  duplicatesList: Array<any>,
  resultColumns1: string,
  resultColumns2: string
): Array<any> => {
  const result: Array<any> = [];
  const resColArr1: Array<string> = resultColumns1.split(',');
  const resColArr2: Array<string> = resultColumns2.split(',');
  const columns: Array<string> = [...resColArr1, ...resColArr2];

  duplicatesList.forEach((item: any) => {
    const row = columns.reduce((rowObj, col) => ({ ...rowObj, [col]: item[col] || null }), {});
    result.push(row);
  });
  return result;
}

export const storeFile = (file: any) => new Promise((resolve, reject) => {
  const fileBuffer = fs.readFileSync(file.path);

  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const params: any = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${file.originalname}-${new Date().getTime()}`,
    Body: fileBuffer
  };

  s3.upload(params, (err: any, data: any) => {
    if (err) {
      return reject(err)
    }
    return resolve(data.location);
  });
});

export const readPinnedFile = (filename: string) => new Promise((resolve, reject) => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const params: any = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${filename}`,
  };

  s3.getObject(params, (err, data) => {
    if (err) {
      return reject(err)
    }
    return resolve(data.Body);
  });
});