import express from 'express';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

import { uploadAndCompareFiles } from '../controller/file.controller';
import { saveEmail } from '../controller/email.controller';
import { registerUser } from '../controller/register.controller';
import { loginUser } from '../controller/login.controller';
import { logoutUser } from '../controller/logout.controller';
import { forgotPassword } from '../controller/forgot-password.controller';

const router = express.Router();

router.post('/api/v1/register', upload.none(), (req: any, res: any) => {
  registerUser(req, res);
});

router.post('/api/v1/login', upload.none(), (req: any, res: any) => {
  loginUser(req, res);
});

router.post('/api/v1/logout', (req: any, res: any) => {
  logoutUser(req, res);
});

router.post(
  '/api/v1/uploadfile',
  upload.fields([{ name: 'sales_file1', maxCount: 1}, { name: 'sales_file2', maxCount: 1}]),
  (req: any, res: any) => {
    uploadAndCompareFiles(req, res);
  }
);

router.post('/api/v1/email', upload.none(), (req: any, res: any) => {
  saveEmail(req, res);
});

router.post('/api/v1/forgotpassword', upload.none(), (req: any, res: any) => {
  forgotPassword(req, res);
});

export default router;