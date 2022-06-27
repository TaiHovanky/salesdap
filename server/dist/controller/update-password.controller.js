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
exports.updatePassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const postgres_1 = __importDefault(require("../db/postgres"));
const logger_utils_1 = require("../utils/logger.utils");
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const users = yield (0, postgres_1.default)('users').select().where({ email });
        if (users && users[0]) {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
            const updatedUser = {
                password: hashedPassword,
                passwordtoken: null,
                passwordtoken_expiration: null
            };
            yield (0, postgres_1.default)('users').update(updatedUser).where({ email });
            return res.status(200).send();
        }
    }
    catch (err) {
        logger_utils_1.logger.error(`update password error - email: ${email} - err: ${err}`);
        return res.status(400).send();
    }
});
exports.updatePassword = updatePassword;
//# sourceMappingURL=update-password.controller.js.map