import { v4 as uuidv4 } from 'uuid';
import {
  findDuplicates,
  readPinnedFile,
  storeFile,
  setupResultColumns,
  setupResults,
  createSalesDataArray
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
  const { sales_file1, sales_file2 }: any = req.files;

  let salesData1: Array<any> = [];
  let salesData2: Array<any> = [];
  try {
    salesData1 = createSalesDataArray(fileStructure1, unstructuredData1, sales_file1 ? sales_file1[0].path : null);
    salesData2 = createSalesDataArray(fileStructure2, unstructuredData2, sales_file2 ? sales_file2[0].path : null);

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

    /* Create array of  columns that the user wants to see */
    const columns: Array<string> = setupResultColumns(
      comparisonColumns1.split(','),
      comparisonColumns2.split(','),
      fileStructure1,
      fileStructure2
    );

    /* Create array of objects (rows a.k.a duplicates) that only contain the columns that the user wants to see */
    const result: Array<any> = setupResults(duplicatesList, columns);
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