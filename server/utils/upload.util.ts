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
 * @param {string} comparisonColumns1 Column that will be compared to comparisonColumns2
 * @param {string} comparisonColumns2 
 * @returns List of rows with duplicate data in the comparison columns
 */
export const findDuplicates = (
  salesData1: Array<any>,
  salesData2: Array<any>,
  comparisonColumns1: Array<string>,
  comparisonColumns2: Array<string>,
  fileStructure1: string,
  fileStructure2: string
): Array<Array<any>> => {
  const valueHash: any = {};
  let resultsList: Array<Array<any>> = comparisonColumns1.map((_) => []);

  addCellValueToHash(
    salesData1,
    comparisonColumns1,
    valueHash,
    fileStructure1
  );
  checkForMatches(
    salesData1,
    salesData2,
    comparisonColumns2,
    valueHash,
    resultsList,
    fileStructure1,
    fileStructure2
  );

  return resultsList;
}

const sanitizeValue = (value: any) => {
  return typeof value === 'string' ?
    value.toLowerCase().trim() : value.toString();
}

const createCellValue = (
  fileStructure: string,
  comparisonColumnList: Array<string>,
  row: any
) => {
  let cellValue: string = '';
  if (fileStructure === 'structured') {
    comparisonColumnList.forEach((column) => {
      cellValue = sanitizeValue(row[column]);
    });
  } else if (fileStructure === 'unstructured') {
    cellValue = sanitizeValue(row);
  }
  return cellValue;
}

/**
 * Loop through each row in spreadsheet while examining the cell in the comparison column
 * and execute a callback on that cell
 * @param {Array<any>} salesData Spreadsheet data
 * @param {string} comparisonColumn Column that we want cell values for
 * @param {any} valueHash Object containing cell value as key, spreadsheet row as value
 * @param callback Function that updates results in some way
 */
const addCellValueToHash = (
  salesData: Array<any>,
  comparisonColumnList: Array<string>,
  valueHash: any,
  fileStructure1: string
): void => {
  salesData.forEach((row: any, rowIndex: number) => {
    const cellValue: string = createCellValue(fileStructure1, comparisonColumnList, row);
    if (cellValue && !valueHash.hasOwnProperty(cellValue)) {
      valueHash[cellValue] = { row, rowIndex };
    }
  });
}

const checkForMatches = (
  salesData1: Array<any>,
  salesData2: Array<any>,
  comparisonColumnList: Array<string>,
  valueHash: any,
  resultsList: Array<Array<any>>,
  fileStructure1: string,
  fileStructure2: string
): void => {
  salesData2.forEach((row: any) => {
    const matchedIndxesForRow: Array<number> = [];
    const cellValue: string = createCellValue(fileStructure1, comparisonColumnList, row);
    if (cellValue && valueHash[cellValue]) {
      /* Add the rowIndex for the match to the list of matched indexes. Later, we'll
      use that list to determine how many columns of that row in file 2 match how many columns
      in file 1 */
      matchedIndxesForRow.push(valueHash[cellValue].rowIndex);
    }

    const possibleMatches: any = {}; /* Object should contain row indexes (from file 1)
    and a count of how many cells from a row in file 2 matched a cell from file 1. This lets us
    determine how precise a match is. If all the cells in the comparison columns for file 2
    match all the cells in the comparison columns for file 1, then it's definitely a match.
    If only some of the cells match, then it could be a match or a false positive. */
    matchedIndxesForRow.forEach((matchedRowIndex: number) => {
      if (!possibleMatches[matchedRowIndex]) {
        possibleMatches[matchedRowIndex] = 1;
      } else if (possibleMatches[matchedRowIndex]) {
        possibleMatches[matchedRowIndex] += 1;
      }
    });

    Array.from(Object.keys(possibleMatches)).forEach((key) => {
      /* possibleMatches[key] is the precision of the match i.e. the number of columns that match between the files.
      Subtract 1 because of zero-indexing in the resultsList, which is an array of arrays */
      let result: any = {};
      if (fileStructure1 === 'structured') {
        result = { ...salesData1[parseInt(key)] };
      } else {
        result = { 'Unstructured Data 1': salesData1[parseInt(key)] };
      }
      if (fileStructure2 === 'structured') {
        result = { ...result, ...row };
      } else {
        result = { ...result, 'Unstructured Data 2': row };
      }
      resultsList[possibleMatches[key] - 1].push(result);
    });
  });
}

/**
 * 
 * @param {string} fileStructure Whether the data input by user is coming from structured file or unstructured list
 * @param {Array<string>} comparisonColumns Desired columns used for comparison
 * @param {number} documentNumber Which file do these columns belong to
 * @returns {Array<string>} Columns that will appear in the final results
 */
export const updateColumns = (
  fileStructure: string,
  comparisonColumns: Array<string>,
  documentNumber: number
): Array<string> => {
  let columns: Array<string> = [];
  if (fileStructure === 'structured') {
    columns = columns.concat([...comparisonColumns]);
  } else if (fileStructure === 'unstructured') {
    columns.push(`Unstructured Data ${documentNumber}`);
  }
  return columns;
}

/**
 * Create a list of the desired columns from each spreadsheet.
 * @param {string} comparisonColumns1 Columns from the 1st spreadsheet that user wants to see in results
 * @param {string} comparisonColumns2 Columns from the 2nd spreadsheet that user wants to see in results
 * @returns {Array<string>} Array of desired columns
 */
export const setupResultColumns = (
  comparisonColumns1: Array<string>,
  comparisonColumns2: Array<string>,
  fileStructure1: string,
  fileStructure2: string
): Array<string> => {
  let columns: Array<string> = [];
  columns = updateColumns(fileStructure1, comparisonColumns1, 1);
  columns = [...columns, ...updateColumns(fileStructure2, comparisonColumns2, 2)];
  return columns;
}

/**
 * 
 * @param {Array<any>} duplicatesList List of rows that have a duplicate cell value in the comparison columns
 * @param {Array<string>} columns Array of desired columns
 * @returns {Array<any>} array of objects (each row in the duplicates table)
 */
export const setupResults = (duplicatesList: Array<any>, columns: Array<string>): Array<any>  => {
  const result: Array<any> = [];
  duplicatesList.forEach((resultsGroupForPrecisionLevel: Array<any>, resultsGroupForPrecisionLevelIdx: number) => {
    resultsGroupForPrecisionLevel.forEach((item: any) => {
      const row = createResultRow(columns, item, resultsGroupForPrecisionLevelIdx + 1);
      result.push(row);
    });
  });

  return result;
}

export const createResultRow = (columns: Array<string>, item: any, precision: number) => {
  return columns.reduce((rowObj: any, col: string) => {
    if (!!rowObj[col]) {
      return { ...rowObj, [`${col}--2`]: item[col] || null };
    }
    return { ...rowObj, [col]: item[col] || item };
  }, { precision });
}

export const storeFile = (file: any, pinnedFileId: string) => new Promise((resolve, reject) => {
  const fileBuffer = fs.readFileSync(file.path);

  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const params: any = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: pinnedFileId,
    Body: fileBuffer
  };

  s3.upload(params, (err: any, data: any) => {
    if (err) {
      return reject(err)
    }
    return resolve(data.location);
  });
});

export const readPinnedFile = (pinnedFileId: string) => new Promise((resolve, reject) => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const params: any = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: pinnedFileId,
  };

  s3.getObject(params, (err, data) => {
    if (err) {
      return reject(err)
    }
    return resolve(data.Body);
  });
});