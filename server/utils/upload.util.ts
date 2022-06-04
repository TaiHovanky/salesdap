/* load 'fs' for readFile and writeFile support */
import * as fs from 'fs';
import AWS from 'aws-sdk';

// Constants for file structure
export const UNFORMATTED_DATA = 'UNFORMATTED_DATA';
export const FORMATTED_DATA = 'FORMATTED_DATA';

/**
 * Converts the file buffer to JSON object
 * @param {any} file
 * @returns {Array<any>} Array of account objects
 */
export const parseJSONFromFile = (file: any): Array<any> => {
  const fileBuffer = fs.readFileSync(file);
  if (fileBuffer) {
    return JSON.parse(fileBuffer.toString());
  }
  return [];
};

/**
 * 
 * @param {string} fileStructure Either formatted (from Excel file) or unformatted (copy/pasted)
 * @param {string} unformattedData Unformatted data that was copied and pasted in
 * @param {any} filePath File path from formData
 * @returns {Array<any>} List of accounts
 */
export const createSalesDataArray = (
  fileStructure: string,
  unformattedData: string,
  filePath?: any
): Array<any> => {
  let salesData: Array<any> = [];
  if (fileStructure === FORMATTED_DATA) {
    salesData = parseJSONFromFile(filePath);
  } else if (fileStructure === UNFORMATTED_DATA) {
    salesData = unformattedData.split('\n');
  }
  return salesData;
}

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

/**
 * Converts a value into a lowercase string and removes leading/trailing spaces
 * @param {any} value Either a cell in formatted data or a row in the unformatted data
 * @returns {string} Sanitized value
 */
const sanitizeValue = (value: any): string => {
  if (!value) {
    return '';
  }
  return typeof value === 'string' ?
    value.toLowerCase().trim() : value.toString().toLowerCase().trim();
}

/**
 * Checks if value hash already has that cell value as a property. If not, then it creates a new
 * key-value pair, with cell value as the key, { row, rowIndex } as the value
 * @param {string} cellValue Sanitized value of the cell
 * @param {any} valueHash Object containing all the cell values and the rows associated
 * @param {any} row The whole row (usually representing a sales account)
 * @param {number} rowIndex Index of the row in the spreadsheet
 */
const lookUpPropertyAndUpdateValueHash = (cellValue: string, valueHash: any, rowIndex: number) => {
  if (cellValue && !valueHash.hasOwnProperty(cellValue)) {
    valueHash[cellValue] = rowIndex;
  }
}

/**
 * Loop through each row in spreadsheet while examining the cell in the comparison column
 * and then add that to a hash containing the cell value as a key, and an object containing
 * the whole row and row index as the value
 * @param {Array<any>} salesData Spreadsheet data
 * @param {string} comparisonColumn Column that we want cell values for
 * @param {any} valueHash Object containing cell value as key, spreadsheet row as value
 */
const addCellValueToHash = (
  salesData: Array<any>,
  comparisonColumnList: Array<string>,
  valueHash: any,
  fileStructure1: string
): void => {
  salesData.forEach((row: any, rowIndex: number) => {
    if (fileStructure1 === FORMATTED_DATA) {
      comparisonColumnList.forEach((column) => {
        const cellValue: string = sanitizeValue(row[column]);
        lookUpPropertyAndUpdateValueHash(cellValue, valueHash, rowIndex);
      });
    } else {
      const cellValue: string = sanitizeValue(row);
      lookUpPropertyAndUpdateValueHash(cellValue, valueHash, rowIndex);
    }
  });
}

const updateMatchedIndexesForRow = (cellValue: string, valueHash: any, matchedIndxesForRow: Array<number>) => {
  if (cellValue && valueHash[cellValue]) {
    /* Add the rowIndex for the match to the list of matched indexes. Later, we'll
    use that list to determine how many columns of that row in file 2 match how many columns
    in file 1 */
    matchedIndxesForRow.push(valueHash[cellValue]);
  }
}

/**
 * For each row in salesData2 (either the 2nd spreadsheet uploaded, or the unformatted data copied in pasted in
 * for the partner accounts), create an array (matchedIndexesForRow) and add row indexes for matched rows.
 * This tracks the number of cells in which there is a match between the row in salesData1 and salesData2.
 * Then in possibleMatches, create an object with a key-value of rowIndex: number of matched cells - this shows us
 * the degree of accuracy that a pair of matched rows has. The more cells are matched between them, the likelier it
 * is a valid match. Then create an object containing properties of both the matching rows in salesData1 and
 * salesData2 and add the object to the results list.
 * @param {Array<any>} salesData1 
 * @param {Array<any>} salesData2 
 * @param {Array<string>} comparisonColumnList 
 * @param {any} valueHash 
 * @param {Array<Array<any>>} resultsList 
 * @param {string} fileStructure1 
 * @param {string} fileStructure2 
 */
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

    if (fileStructure2 === FORMATTED_DATA) {
      comparisonColumnList.forEach((column) => {
        const cellValue: string = sanitizeValue(row[column]);
        updateMatchedIndexesForRow(cellValue, valueHash, matchedIndxesForRow);
      });
    } else {
      const cellValue: string = sanitizeValue(row);
      updateMatchedIndexesForRow(cellValue, valueHash, matchedIndxesForRow);
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
      /* possibleMatches[key] is the accuracy of the match i.e. the number of columns that match between the files.
      Subtract 1 because of zero-indexing in the resultsList, which is an array of arrays */
      let result: any = {};
      if (fileStructure1 === FORMATTED_DATA) {
        result = { ...salesData1[parseInt(key)] };
      } else {
        result = { 'Unformatted Data 1': salesData1[parseInt(key)] };
      }
      if (fileStructure2 === FORMATTED_DATA) {
        result = { ...result, ...row };
      } else {
        result = { ...result, 'Unformatted Data 2': row };
      }
      resultsList[possibleMatches[key] - 1].push(result);
    });
  });
}

/**
 * 
 * @param {string} fileStructure Whether the data input by user is coming from formatted file or unformatted list
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
  if (fileStructure === FORMATTED_DATA) {
    columns = columns.concat([...comparisonColumns]);
  } else if (fileStructure === UNFORMATTED_DATA) {
    columns.push(`Unformatted Data ${documentNumber}`);
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
  duplicatesList.forEach((resultsGroupForAccuracyLevel: Array<any>, resultsGroupForAccuracyLevelIdx: number) => {
    resultsGroupForAccuracyLevel.forEach((item: any) => {
      const row = createResultRow(columns, item, resultsGroupForAccuracyLevelIdx + 1);
      result.push(row);
    });
  });

  return result;
}

/**
 * 
 * @param {Array<string>} columns All of the columns for a result object (columns from both
 * salesData1 and salesData2)
 * @param {any} item 1 result in the results list
 * @param {number} accuracy Number of matched cells between the 2 rows from salesData1 and salesData2
 * @returns Result that will be displayed in the duplicates table page
 */
export const createResultRow = (columns: Array<string>, item: any, accuracy: number) => {
  return columns.reduce((rowObj: any, col: string) => {
    if (!!rowObj[col]) {
      if (typeof item !== 'string') {
        return { ...rowObj, [`${col}--2`]: item[col] || '' };
      } else {
        return { ...rowObj, [`${col}--2`]: item || '' };
      }
    }
    if (typeof item !== 'string') {
      return { ...rowObj, [col]: item[col] || '' };
    } else {
      return { ...rowObj, [col]: item || '' }
    }
  }, { accuracy });
}

/**
 * Save the file to S3 bucket
 * @param {any} file File data to be uploaded to S3
 * @param {string} pinnedFileId Unique ID for the file
 * @returns 
 */
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

/**
 * Retrieves the pinned file from the S3 bucket
 * @param {string} pinnedFileId ID of the pinned file from the database
 * @returns 
 */
export const readPinnedFile = (pinnedFileId: string) => new Promise((resolve, reject) => {
  console.log('buckets', process.env.AWS_ACCESS_KEY_ID, process.env.AWS_BUCKET_NAME);
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
      console.log('err reading pinned file', err);
      return reject(err)
    }
    return resolve(data.Body);
  });
});