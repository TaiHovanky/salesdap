import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

import { uploadFile } from '../controller/file.controller';
import express from 'express';
const router = express.Router();

router.post('/api/v1/uploadfile', upload.single('sales_file'), (req: any, res: any) => {
  uploadFile(req, res);
})

export default router;