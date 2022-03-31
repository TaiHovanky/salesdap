import { createJSONFromWorksheet, findDuplicates, displayRelevantColumns } from '../utils/upload.util';

export const uploadAndCompareFiles = (req: any, res: any) => {
  const {
    comparisonColumn1,
    comparisonColumn2,
    resultColumns1,
    resultColumns2
  } = req.body;
  /* Convert the uploaded spreadsheets into JSON objects that can be processed */
  const salesData1: Array<any> = createJSONFromWorksheet(req.files.sales_file1[0]);
  const salesData2: Array<any> = createJSONFromWorksheet(req.files.sales_file2[0]);

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
}
