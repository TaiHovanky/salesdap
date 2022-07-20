"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const profile_controller_1 = require("../controller/profile.controller");
const payment_controller_1 = require("../controller/payment.controller");
const authenticate_1 = require("../middleware/authenticate");
const router = express_1.default.Router();
router.post('/api/v1/register', upload.none(), (req, res) => {
    (0, register_controller_1.registerUser)(req, res);
});
router.post('/api/v1/login', upload.none(), (req, res) => {
    (0, login_controller_1.loginUser)(req, res);
});
router.post('/api/v1/refresh_token', upload.none(), (req, res) => {
    (0, login_controller_1.refreshAccessToken)(req, res);
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
router.post('/api/v1/payment', (req, res) => {
    (0, payment_controller_1.makePayment)(req, res);
});
router.post('/api/v1/create-checkout-session', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, payment_controller_1.createCheckoutSession)(req, res);
}));
router.post('/api/v1/create-portal-session', (req, res) => {
    (0, payment_controller_1.createCustomerPortal)(req, res);
});
router.post('/api/v1/order-success', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, payment_controller_1.handleSuccessfulSubscription)(req, res);
}));
router.use(authenticate_1.authenticate);
router.post('/api/v1/uploadfile', upload.any(), (req, res) => {
    (0, file_controller_1.uploadAndCompareFiles)(req, res);
});
router.post('/api/v1/pinfile', upload.fields([{ name: 'sales_file', maxCount: 1 }]), (req, res) => {
    (0, file_controller_1.pinFile)(req, res);
});
router.get('/api/v1/viewpinnedfile', (req, res) => {
    (0, file_controller_1.viewPinnedFile)(req, res);
});
router.post('/api/v1/edit-profile', upload.none(), (req, res) => {
    (0, profile_controller_1.editProfile)(req, res);
});
exports.default = router;
//# sourceMappingURL=index.js.map