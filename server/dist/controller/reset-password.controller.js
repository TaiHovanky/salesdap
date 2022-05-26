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
exports.verifyResetPasswordToken = void 0;
const db_1 = __importDefault(require("../db"));
const verifyResetPasswordToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body.token;
    try {
        const users = yield (0, db_1.default)('users').select().where({ passwordtoken: token }).andWhere('passwordtoken_expiration', '>', new Date());
        if (users && users[0]) {
            res.status(200).send('Password reset link is valid');
        }
    }
    catch (err) {
        res.status(400).send('Invalid password reset link');
    }
});
exports.verifyResetPasswordToken = verifyResetPasswordToken;
//# sourceMappingURL=reset-password.controller.js.map