"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisSession = void 0;
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis_1 = require("../db/redis");
exports.redisSession = session({
    store: new RedisStore({ client: redis_1.redisClient }),
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    resave: false,
    cookie: {
        sameSite: 'none',
        secure: true,
        httpOnly: false,
        maxAge: 1000 * 60 * 30,
        path: '/',
        domain: 'https://salesdap.com'
    }
});
//# sourceMappingURL=session.js.map