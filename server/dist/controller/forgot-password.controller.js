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
exports.forgotPassword = void 0;
const crypto_1 = __importDefault(require("crypto"));
const nodemailer = require("nodemailer");
const postgres_1 = __importDefault(require("../db/postgres"));
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const users = yield (0, postgres_1.default)('users').select().where({ email });
        if (users && users[0]) {
            const token = crypto_1.default.randomBytes(20).toString('hex');
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.FORGOT_PASSWORD_EMAIL_SENDER,
                    pass: process.env.FORGOT_PASSWORD_EMAIL_PWD,
                },
            });
            const mailOptions = {
                from: process.env.FORGOT_PASSWORD_EMAIL_SENDER,
                to: 'tai.hovanky@gmail.com',
                subject: 'Link To Reset Password',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
                    + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
                    + `http://localhost:3000/password-reset/${token}\n\n`
                    + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
            };
            let info = yield transporter.sendMail(mailOptions);
            if (info && info !== '0') {
                const data = {
                    passwordtoken: token,
                    passwordtoken_expiration: new Date(Date.now() + 3600000)
                };
                (0, postgres_1.default)('users').update(data).where({ email })
                    .then(() => res.status(200).json('Password reset email was sent'));
            }
        }
        else {
            return res.status(401).send('Invalid email');
        }
    }
    catch (err) {
        console.log('password reset err', err);
        return res.status(401).send('Password reset email failed to send');
    }
});
exports.forgotPassword = forgotPassword;
//# sourceMappingURL=forgot-password.controller.js.map