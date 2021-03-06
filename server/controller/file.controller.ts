import {
  findDuplicates,
  parseJSONFromFile,
  displayRelevantColumns,
  readPinnedFile,
  storeFile
} from '../utils/upload.util';
import db from '../db';

export const uploadAndCompareFiles = async (req: any, res: any) => {
  const {
    comparisonColumn1,
    comparisonColumn2,
    resultColumns1,
    resultColumns2,
  } = req.body;

  try {
    const salesData1: Array<any> = parseJSONFromFile(req.files.sales_file1[0].path);
    const salesData2: Array<any> = parseJSONFromFile(req.files.sales_file2[0].path);

    /* Create list of rows where there is a duplicate value that is shared between the specified columns
      (comparisonColumn1 and comparisonColumn2) */
    const duplicatesList: Array<any> = findDuplicates(
      salesData1,
      salesData2,
      comparisonColumn1,
      comparisonColumn2);

    /* Create array of objects (rows) that only contain the columns that the user wants to see
      (as specified in resultColumns1 and resultColumns2 */
    const result: Array<any> = displayRelevantColumns(duplicatesList, resultColumns1, resultColumns2);
    res.status(200).json(result);
  } catch(err: any) {
    res.status(400).send();
  }
}

export const pinFile = (req: any, res: any) => {
  if (req.files && req.files.sales_file) {
    const file = req.files.sales_file[0];
    const { email } = req.body;
  
    storeFile(file)
      .then(() => {
        db('users').update({ pinned_filename: file.originalname }).where({ email })
          .then(() => res.status(200).send('File pinned successfully'));
      })
      .catch((err: any) => {
        res.status(400).send();
        console.log('failed to pin file: ', err);
      });
  } else {
    res.status(400).send();
  }
}

export const viewPinnedFile = (req: any, res: any) => {
  const { filename } = req.params;
  readPinnedFile(filename)
    .then((data) => res.status(200).send(data))
    .catch((err: any) => {
      res.status(400).send();
      console.log('failed to get pinned file: ', err);
    });
}