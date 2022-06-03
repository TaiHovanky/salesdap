"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const authenticate = (req, _, next) => {
    console.log('req session ---- authenticate', req.session, req.sessionID);
    if (!req.session || !req.session.user) {
        const err = new Error('Unauthenticated');
        next(err);
    }
    next();
};
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate.js.map