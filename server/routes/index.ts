import express from 'express';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

import { uploadFile } from '../controller/file.controller';
import { saveEmail } from '../controller/email.controller';

const router = express.Router();

router.post('/api/v1/uploadfile', upload.single('sales_file'), (req: any, res: any) => {
  uploadFile(req, res);
});

router.post('/api/v1/email', upload.none(), (req: any, res: any) => {
  saveEmail(req, res);
});

export default router;