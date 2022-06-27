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
exports.registerUser = void 0;
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const postgres_1 = __importDefault(require("../db/postgres"));
const auth_utils_1 = require("../utils/auth.utils");
const logger_utils_1 = require("../utils/logger.utils");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, firstname, lastname, company, subscriptionType } = req.body;
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        const newUser = {
            userid: (0, uuid_1.v4)(),
            email,
            password: hashedPassword,
            firstname,
            lastname,
            company,
            subscription_type: subscriptionType
        };
        yield (0, postgres_1.default)('users').insert(newUser);
        const token = (0, auth_utils_1.createAccessToken)(newUser);
        (0, auth_utils_1.sendRefreshToken)(res, (0, auth_utils_1.createRefreshToken)(newUser));
        return res.status(200).json({ email, firstname, lastname, company, token });
    }
    catch (err) {
        console.info('reg err-------------------------------------', err);
        logger_utils_1.logger.error(`registration error: ${err}`);
        return res.status(400).send();
    }
});
exports.registerUser = registerUser;
//# sourceMappingURL=register.controller.js.map