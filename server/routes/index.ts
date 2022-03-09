import { registerUser, loginUser } from '../controller/user.controller';
import { getOrganizations, createOrganization } from '../controller/organization.controller';
import { uploadFile } from '../controller/file.controller';
import express from 'express';
const router = express.Router();

router.post('/api/v1/register', (req: any, res: any) => {
  registerUser(req, res);
});

router.post('/api/v1/login', (req: any, res: any) => {
  loginUser(req, res);
});

// router.post('/api/v1/upload', (req, res) => {
//   console.log('uploading');
// });

router.post('/api/v1/organization', (req: any, res: any) => {
  createOrganization(req, res);
});

router.get('/api/v1/organization', (req: any, res: any) => {
  getOrganizations(req, res);
});

router.post('/api/v1/uploadfile', (req: any) => {
  uploadFile(req);
})

export default router;