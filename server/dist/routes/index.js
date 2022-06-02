"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ dest: 'uploads/' });
const file_controller_1 = require("../controller/file.controller");
const email_controller_1 = require("../controller/email.controller");
const register_controller_1 = require("../controller/register.controller");
const login_controller_1 = require("../controller/login.controller");
const logout_controller_1 = require("../controller/logout.controller");
const forgot_password_controller_1 = require("../controller/forgot-password.controller");
const reset_password_controller_1 = require("../controller/reset-password.controller");
const update_password_controller_1 = require("../controller/update-password.controller");
const router = express_1.default.Router();
router.post('/api/v1/register', upload.none(), (req, res) => {
    (0, register_controller_1.registerUser)(req, res);
});
router.post('/api/v1/login', upload.none(), (req, res) => {
    (0, login_controller_1.loginUser)(req, res);
});
router.post('/api/v1/logout', (req, res) => {
    (0, logout_controller_1.logoutUser)(req, res);
});
router.post('/api/v1/email', upload.none(), (req, res) => {
    (0, email_controller_1.saveEmail)(req, res);
});
router.post('/api/v1/forgotpassword', upload.none(), (req, res) => {
    (0, forgot_password_controller_1.forgotPassword)(req, res);
});
router.post('/api/v1/resetpassword', (req, res) => {
    (0, reset_password_controller_1.verifyResetPasswordToken)(req, res);
});
router.post('/api/v1/updatepassword', upload.none(), (req, res) => {
    (0, update_password_controller_1.updatePassword)(req, res);
});
router.post('/api/v1/uploadfile', upload.fields([{ name: 'sales_file1', maxCount: 1 }, { name: 'sales_file2', maxCount: 1 }]), (req, res) => {
    (0, file_controller_1.uploadAndCompareFiles)(req, res);
});
router.post('/api/v1/pinfile', upload.fields([{ name: 'sales_file', maxCount: 1 }]), (req, res) => {
    (0, file_controller_1.pinFile)(req, res);
});
router.get('/api/v1/viewpinnedfile', (req, res) => {
    console.log('req session:', req.session, 'req sess user:', req.session.user, req.sessionID);
    if (!req.session || !req.session.user) {
        const err = new Error('Unauthenticated');
        return res.status(404).send(err);
    }
    (0, file_controller_1.viewPinnedFile)(req, res);
});
exports.default = router;
//# sourceMappingURL=index.js.map