import express from 'express';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

import { uploadAndCompareFiles, pinFile, viewPinnedFile } from '../controller/file.controller';
import { saveEmail } from '../controller/email.controller';
import { registerUser } from '../controller/register.controller';
import { loginUser, refreshAccessToken } from '../controller/login.controller';
import { logoutUser } from '../controller/logout.controller';
import { forgotPassword } from '../controller/forgot-password.controller';
import { verifyResetPasswordToken } from '../controller/reset-password.controller';
import { updatePassword } from '../controller/update-password.controller';
import { editProfile } from '../controller/profile.controller';
import {
  createCheckoutSession,
  makePayment,
  createCustomerPortal,
  handleSuccessfulSubscription
} from '../controller/payment.controller';
import { authenticate } from '../middleware/authenticate';

const router = express.Router();

// Unprotected routes

router.post('/api/v1/register', upload.none(), (req: any, res: any) => {
  registerUser(req, res);
});

router.post('/api/v1/login', upload.none(), (req: any, res: any) => {
  loginUser(req, res);
});

router.post('/api/v1/refresh_token', upload.none(), (req: any, res: any) => {
  refreshAccessToken(req, res);
});

router.post('/api/v1/logout', (req: any, res: any) => {
  logoutUser(req, res);
});

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

router.post('/api/v1/payment', (req: any, res: any) => {
  makePayment(req, res);
});

router.post('/api/v1/create-checkout-session', async (req: any, res: any) => {
  createCheckoutSession(req, res);
});

router.post('/api/v1/create-portal-session', (req: any, res: any) => {
  createCustomerPortal(req, res);
});

router.post('/api/v1/order-success', async (req: any, res: any) => {
  handleSuccessfulSubscription(req, res);
});

// Protected routes
router.use(authenticate);

router.post(
  '/api/v1/uploadfile',
  upload.any(),
    // .fields([{ name: 'sales_file1', maxCount: 1}, { name: 'sales_file2', maxCount: 1}]),
  (req: any, res: any) => {
    uploadAndCompareFiles(req, res);
  }
);

router.post(
  '/api/v1/pinfile',
  upload.fields([{ name: 'sales_file', maxCount: 1}]),
  (req: any, res: any) => {
    pinFile(req, res);
  }
);

router.get('/api/v1/viewpinnedfile', (req: any, res: any) => {
  viewPinnedFile(req, res);
});

router.post('/api/v1/edit-profile', upload.none(), (req: any, res: any) => {
  editProfile(req, res);
});

export default router;