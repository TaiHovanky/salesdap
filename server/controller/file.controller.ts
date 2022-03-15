// import multer from 'multer';
// const upload = multer({ dest: 'uploads/' });
import * as XLSX from 'xlsx';

/* load 'fs' for readFile and writeFile support */
import * as fs from 'fs';
// XLSX.set_fs(fs);

/* load the codepage support library for extended support with older formats  */
// import * as cpexcel from 'xlsx/dist/cpexcel.full.mjs';
// XLSX.set_cptable(cpexcel);

export const uploadFile = (req: any) => {
  // console.log('req body in uploadfile', req);
  const buf = fs.readFileSync(req.file.path);
  const workbook = XLSX.read(buf);

  console.log('workbook', workbook);
  const sheetName: string = workbook.SheetNames[0];
  const worksheet: any = workbook && workbook.Sheets ?
    workbook.Sheets[sheetName as any] : null;
  const jsa = XLSX.utils.sheet_to_json(worksheet);
  console.log('jsa----------------------------', jsa);
}