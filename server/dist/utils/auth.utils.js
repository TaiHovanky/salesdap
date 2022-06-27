"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRefreshToken = exports.createRefreshToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const createAccessToken = (user) => {
    return (0, jsonwebtoken_1.sign)({ userId: user.userid }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};
exports.createAccessToken = createAccessToken;
const createRefreshToken = (user) => {
    return (0, jsonwebtoken_1.sign)({ email: user.email, tokenVersion: user.token_version || 0 }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};
exports.createRefreshToken = createRefreshToken;
const sendRefreshToken = (res, token) => {
    res.cookie('rtsd', token, {
        httpOnly: true,
        path: '/api/v1/refresh_token',
        secure: true
    });
};
exports.sendRefreshToken = sendRefreshToken;
//# sourceMappingURL=auth.utils.js.map