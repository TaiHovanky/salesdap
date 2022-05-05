import { v4 as uuidv4 } from 'uuid';
import {
  findDuplicates,
  parseJSONFromFile,
  setUpResultColumns,
  readPinnedFile,
  storeFile
} from '../utils/upload.util';
import db from '../db';

export const uploadAndCompareFiles = async (req: any, res: any) => {
  const {
    comparisonColumns1,
    comparisonColumns2,
    fileStructure1,
    fileStructure2,
    unstructuredData1,
    unstructuredData2
  } = req.body;

  let salesData1: Array<any> = [];
  let salesData2: Array<any> = [];
  try {
    if (fileStructure1 === 'structured') {
      salesData1 = parseJSONFromFile(req.files.sales_file1[0].path);
    } else {
      salesData1 = unstructuredData1.split('\n');
    }
    if (fileStructure2 === 'structured') {
      salesData2 = parseJSONFromFile(req.files.sales_file2[0].path);
    } else {
      salesData2 = unstructuredData2.split('\n');
    }

    /* Create list of rows where there is a duplicate value that is shared between the specified columns
      (comparisonColumns1 and comparisonColumns2) */
    const duplicatesList: Array<any> = findDuplicates(
      salesData1,
      salesData2,
      comparisonColumns1.split(','),
      comparisonColumns2.split(','),
      fileStructure1,
      fileStructure2
    );

    /* Create array of objects (rows) that only contain the columns that the user wants to see
      (as specified in resultColumns1 and resultColumns2 */
    const result: Array<any> = setUpResultColumns(
      duplicatesList,
      comparisonColumns1.split(','),
      comparisonColumns2.split(','),
      fileStructure1,
      fileStructure2
    );
    res.status(200).json(result);
  } catch(err: any) {
    res.status(400).send();
  }
}

export const pinFile = (req: any, res: any) => {
  if (req.files && req.files.sales_file) {
    const file = req.files.sales_file[0];
    const { email } = req.body;
    const pinned_file_id: string = uuidv4();
    const fileMetadata: any = {
      pinned_filename: file.originalname,
      pinned_file_id
    }
  
    storeFile(file, pinned_file_id)
      .then(() => {
        db('users').update(fileMetadata).where({ email })
          .then(() => {
            res.status(200).json(fileMetadata);
          });
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
  const { pinnedFileId } = req.query;
  readPinnedFile(pinnedFileId)
    .then((data: any) => res.status(200).send(data))
    .catch((err: any) => {
      res.status(400).send();
      console.log('failed to get pinned file: ', err);
    });
}