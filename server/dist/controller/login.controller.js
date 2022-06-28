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
exports.checkForActiveSubscription = exports.refreshAccessToken = exports.loginUser = void 0;
const jwt = require("jsonwebtoken");
const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET);
const bcryptjs_1 = require("bcryptjs");
const postgres_1 = __importDefault(require("../db/postgres"));
const auth_utils_1 = require("../utils/auth.utils");
const logger_utils_1 = require("../utils/logger.utils");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    logger_utils_1.logger.warn('some login warning');
    try {
        const users = yield (0, postgres_1.default)('users').select().where({ email });
        if (!users || !users[0]) {
            logger_utils_1.logger.warn(`login fail no user found - email: ${email}`);
            return res.status(401).send();
        }
        const isPasswordValid = yield (0, bcryptjs_1.compare)(password, users[0].password);
        if (isPasswordValid) {
            const isActive = yield (0, exports.checkForActiveSubscription)(users[0].customer_id);
            if (!isActive && users[0].active_subscription === true) {
                yield (0, postgres_1.default)('users').update({ active_subscription: false, subscription_type: 'FREE' }).where({ email });
            }
            const token = (0, auth_utils_1.createAccessToken)(users[0]);
            const _a = users[0], { password, userid, customer_id, passwordtoken, passwordtoken_expiration } = _a, user = __rest(_a, ["password", "userid", "customer_id", "passwordtoken", "passwordtoken_expiration"]);
            (0, auth_utils_1.sendRefreshToken)(res, (0, auth_utils_1.createRefreshToken)(user));
            return res.status(200).json(Object.assign(Object.assign({}, user), { token }));
        }
        else {
            logger_utils_1.logger.warn(`login fail invalid password - email: ${email}`);
        }
        return res.status(401).send();
    }
    catch (err) {
        logger_utils_1.logger.error(`login error - err: ${err}`);
        return res.status(401).send();
    }
});
exports.loginUser = loginUser;
const refreshAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.rtsd;
    let payload = null;
    if (!!refreshToken && refreshToken !== 'undefined') {
        try {
            payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        }
        catch (err) {
            console.log('ref token verification failed');
            return res.status(200).send();
        }
    }
    else {
        return res.status(200).send();
    }
    try {
        const users = yield (0, postgres_1.default)('users').select().where({ email: payload.email });
        const isActive = yield (0, exports.checkForActiveSubscription)(users[0].customer_id);
        if (users && users[0]) {
            if (!isActive && users[0].active_subscription === true) {
                yield (0, postgres_1.default)('users').update({ active_subscription: false, subscription_type: 'FREE' }).where({ email: payload.email });
            }
            const token = (0, auth_utils_1.createAccessToken)(users[0]);
            const _b = users[0], { password, userid, customer_id, passwordtoken, passwordtoken_expiration } = _b, user = __rest(_b, ["password", "userid", "customer_id", "passwordtoken", "passwordtoken_expiration"]);
            (0, auth_utils_1.sendRefreshToken)(res, (0, auth_utils_1.createRefreshToken)(user));
            return res.status(200).json(Object.assign(Object.assign({}, user), { token }));
        }
        else {
            logger_utils_1.logger.warn('refresh token fail no user found');
        }
        return res.status(200).send();
    }
    catch (err) {
        logger_utils_1.logger.error(`refresh token error - err: ${err}`);
        return res.status(200).send();
    }
});
exports.refreshAccessToken = refreshAccessToken;
const checkForActiveSubscription = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!customerId) {
        return false;
    }
    const customer = yield stripe.customers.retrieve(customerId, { expand: ['subscriptions'] });
    if (customer && customer.subscriptions && customer.subscriptions.data) {
        const hasActiveSubscription = !!customer.subscriptions.data.find((subscription) => {
            return subscription.status === 'active';
        });
        if (hasActiveSubscription) {
            return true;
        }
    }
    return false;
});
exports.checkForActiveSubscription = checkForActiveSubscription;
//# sourceMappingURL=login.controller.js.map