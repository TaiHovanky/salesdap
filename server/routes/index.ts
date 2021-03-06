import express from 'express';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

import { uploadAndCompareFiles, pinFile, viewPinnedFile } from '../controller/file.controller';
import { saveEmail } from '../controller/email.controller';
import { registerUser } from '../controller/register.controller';
import { loginUser } from '../controller/login.controller';
import { logoutUser } from '../controller/logout.controller';
import { forgotPassword } from '../controller/forgot-password.controller';
import { verifyResetPasswordToken } from '../controller/reset-password.controller';
import { updatePassword } from '../controller/update-password.controller';

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

router.post('/api/v1/resetpassword', (req: any, res: any) => {
  verifyResetPasswordToken(req, res);
});

router.post('/api/v1/updatepassword', upload.none(), (req: any, res: any) => {
  updatePassword(req, res);
});

router.post('/api/v1/pinfile', upload.fields([{ name: 'sales_file', maxCount: 1}]), (req: any, res: any) => {
  pinFile(req, res);
});

router.get('/api/v1/viewpinnedfile', (req: any, res: any) => {
  viewPinnedFile(req, res);
});

export default router;