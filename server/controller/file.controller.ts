import { v4 as uuidv4 } from 'uuid';
import {
  findDuplicates,
  readPinnedFile,
  storeFile,
  setupResultColumns,
  setupResults,
  createSalesDataArray,
  updatePinnedFileTable
} from '../utils/upload.util';
import db from '../db/postgres';
import { logger } from '../utils/logger.utils';

export const uploadAndCompareFiles = async (req: any, res: any) => {
  console.log('compare files uplad and compare')
  const {
    comparisonColumns1,
    comparisonColumns2,
    fileStructure1,
    fileStructure2,
    unformattedData1,
    unformattedData2,
    userSubscriptionType,
    userFreeComparisons,
    userEmail
  } = req.body;
  const [ sales_file1, sales_file2 ]: any = req.files;
  console.log('sales file 1', sales_file1, sales_file2, req.files)

  let salesData1: Array<any> = [];
  let salesData2: Array<any> = [];
  try {
    salesData1 = createSalesDataArray(fileStructure1, unformattedData1, sales_file1 ? sales_file1[0].path : null);
    salesData2 = createSalesDataArray(fileStructure2, unformattedData2, sales_file2 ? sales_file2[0].path : null);
    console.log('saelsdata', salesData1, salesData2)
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
    console.log('duplicates list', duplicatesList);

    /* Create array of  columns that the user wants to see */
    const columns: Array<string> = setupResultColumns(
      comparisonColumns1.split(','),
      comparisonColumns2.split(','),
      fileStructure1,
      fileStructure2
    );
    console.log('columns', columns);

    /* Create array of objects (rows a.k.a duplicates) that only contain the columns that the user wants to see */
    const result: Array<any> = setupResults(duplicatesList, columns);

    if (userSubscriptionType === 'FREE') {
      await db('users').update({
        free_comparisons: parseInt(userFreeComparisons) + 1
      }).where({ email: userEmail });
    }
    res.send(result);
  } catch(err: any) {
    console.log('err ', err);
    logger.error(`compare files error - email: ${userEmail} - err: ${err}`);
    return res.status(400).send();
  }
}

export const pinFile = async (req: any, res: any) => {
  const { email, file_label } = req.body;
  const pinned_file_id: string = req.body.pinned_file_id || uuidv4();

  try {
    const [user] = await db('users').select('userid').where({ email });
    const fileMetadata: any = {
      file_label,
      pinned_file_id,
      user_id: user.userid
    }
  
    if (req.files && req.files.sales_file) {
      const file = req.files.sales_file[0];
      fileMetadata.file_name = file.originalname;
      await storeFile(file, pinned_file_id)
    }
  
    await updatePinnedFileTable(fileMetadata, res);
  } catch (err: any) {
    logger.error(`pin file error - pinned file: ${pinned_file_id} - err: ${err}`);
    return res.status(400).send();
  };
}

export const viewPinnedFile = (req: any, res: any) => {
  const { pinnedFileId } = req.query;
  console.log('pinned file id', pinnedFileId);
  readPinnedFile(pinnedFileId)
    .then((data: any) => {
      return res.status(200).send(data);
    })
    .catch((err: any) => {
      logger.error(`view pinned file error - pinned file: ${pinnedFileId} - err: ${err}`);
      return res.status(400).send();
    });
}
