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
  comparisonColumns1: Array<string>,
  comparisonColumns2: Array<string>
): Array<Array<any>> => {
  const valueHash: any = {};
  let resultsList: Array<Array<any>> = comparisonColumns1.map((_) => []);
  console.log('res list start', resultsList);

  addCellValueToHash(
    salesData1,
    comparisonColumns1,
    valueHash,
    // resultsList,
    // addCellValueToHash
  );
  // console.log('value hash', valueHash);
  checkForMatches(
    salesData1,
    salesData2,
    comparisonColumns2,
    valueHash,
    resultsList,
    // checkForDuplicates
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
const addCellValueToHash = (
  salesData: Array<any>,
  comparisonColumnList: Array<string>,
  valueHash: any,
  // resultsList: Array<any>,
  // callback: any
): void => {
  salesData.forEach((row: any, rowIndex: number) => {
    comparisonColumnList.forEach((column) => {
      const cellValue: string = row[column];
      if (cellValue) {
        // const sanitizedCellValue: string = cellValue.toLowerCase().trim();
        if (!valueHash.hasOwnProperty(cellValue)) {
          valueHash[cellValue] = { row, rowIndex };
        }
      }
    });
  });
}

const checkForMatches = (
  salesData1: Array<any>,
  salesData2: Array<any>,
  comparisonColumnList: Array<string>,
  valueHash: any,
  resultsList: Array<Array<any>>,
  // callback: any
): void => {
  salesData2.forEach((row: any, rowIndex: number) => {
    const matchedIndxesForRow: Array<number> = [];
    comparisonColumnList.forEach((column) => {
      const cellValue: string = row[column];
      if (cellValue) {
        console.log('if cell val', cellValue);
        // const sanitizedCellValue: string = cellValue.toLowerCase().trim();
        if (valueHash[cellValue]) {
          /* Add the rowIndex for the match to the list of matched indexes. Later, we'll
          use that list to determine how many columns of that row in file 2 match how many columns
          in file 1 */
          console.log('matched indexes for row in loop', matchedIndxesForRow)
          matchedIndxesForRow.push(valueHash[cellValue].rowIndex);
        }
      }
    });
    console.log('matched indexes for row', matchedIndxesForRow);

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
    console.log('possible matches', possibleMatches)
    
    Array.from(Object.keys(possibleMatches)).forEach((key) => {
      // note that key is equal to the rowIndex of file 1. rowIndex in this func is for file 2
      if (possibleMatches[key] === comparisonColumnList.length) {
        console.log('precise match ', rowIndex);
        resultsList[0].push({ ...row, ...salesData1[parseInt(key)] });
      } else if (possibleMatches[key] === comparisonColumnList.length - 1 && resultsList[1]) {
        console.log('less precise match ', rowIndex);
        resultsList[1].push({ ...row, ...salesData1[parseInt(key)] });
      } else if (possibleMatches[key] === comparisonColumnList.length - 2 && resultsList[2]) {
        console.log('imprecise match ', rowIndex);
        resultsList[2].push({ ...row, ...salesData1[parseInt(key)] });
      }
    });
  });

  console.log('results list after', resultsList);
}

/**
 * Update the value hash
 * @param {string} cellValue Cell in the row/column
 * @param {any} valueHash Object containing cell value as key, spreadsheet row as value
 * @param {any} row Object that represents a row in the spreadsheet
 */
// const addCellValueToHash = (cellValue: string, valueHash: any, row: any): void => {
//   if (!valueHash.hasOwnProperty(cellValue)) {
//     valueHash[cellValue] = row;
//   }
// }

/**
 * Compare the cell with the valueHash to see if there's a match with the data from the
 * other spreadsheet
 * @param {string} cellValue Cell in the row/column
 * @param {any} valueHash Object containing cell value as key, spreadsheet row as value
 * @param {any} row Object that represents a row in the spreadsheet
 * @param {Array<any>} resultsList List of rows that contain duplicate values
 */
// const checkForDuplicates = (
//   cellValue: string,
//   valueHash: any,
//   row: any,
//   resultsList: Array<any>,
// ): void => {
//   if (valueHash[cellValue]) {
//     resultsList.push({ ...valueHash[cellValue], ...row});
//   }
// }

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

  duplicatesList.forEach((category: Array<any>) => {
    category.forEach((item: any) => {
      const row = columns.reduce((rowObj, col) => ({ ...rowObj, [col]: item[col] || null }), {});
      result.push(row);
    });
  })
  console.log('res cols', resColArr1, resColArr2, result);
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