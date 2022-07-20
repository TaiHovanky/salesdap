"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const authenticate = (req, _, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        console.log('no auth headers---------------------------------------');
        const err = new Error('Unauthenticated');
        next(err);
    }
    else {
        try {
            const token = authorization.split(' ')[1];
            const payload = (0, jsonwebtoken_1.verify)(token, process.env.ACCESS_TOKEN_SECRET);
            if (payload) {
                return next();
            }
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate.js.map