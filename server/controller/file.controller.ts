import { createJSONFromWorksheet, findDuplicates } from '../utils/upload.util';

export const uploadFile = (req: any, res: any) => {
  const { columnName }: { columnName: string} = req.body;
  let salesData: Array<any> = createJSONFromWorksheet(req);
  const result: Array<any> = findDuplicates(salesData, columnName);
  res.json(result);
}
