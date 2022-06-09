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
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstname, lastname, company } = req.body;
    const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
    const newUser = {
        userid: (0, uuid_1.v4)(),
        email,
        password: hashedPassword,
        firstname,
        lastname,
        company
    };
    (0, postgres_1.default)('users').insert(newUser)
        .then(() => {
        return res.status(200).json({ email, firstname, lastname, company });
    })
        .catch((err) => console.log('register err', err));
});
exports.registerUser = registerUser;
//# sourceMappingURL=register.controller.js.map