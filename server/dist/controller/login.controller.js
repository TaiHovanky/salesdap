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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const bcryptjs_1 = require("bcryptjs");
const postgres_1 = __importDefault(require("../db/postgres"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const users = yield (0, postgres_1.default)('users').select().where({ email });
        if (users && users[0]) {
            const isPasswordValid = yield (0, bcryptjs_1.compare)(password, users[0].password);
            if (isPasswordValid) {
                req.session.user = users[0].userid;
                req.session.save();
                console.log('req session user after login', req.session, req.sessionID);
                const _a = users[0], { password, userid } = _a, user = __rest(_a, ["password", "userid"]);
                res.header('Access-Control-Allow-Origin', "https://salesdap.com");
                res.header('Access-Control-Allow-Credentials', true);
                res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, HEAD, OPTIONS');
                return res.status(200)
                    .send(user);
            }
            return res.status(401).send();
        }
        return res.status(401).send();
    }
    catch (err) {
        console.log('login err', err);
        return res.status(401).send();
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=login.controller.js.map