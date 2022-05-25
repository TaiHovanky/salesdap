"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = void 0;
const logoutUser = (req, res) => {
    return new Promise((resolve) => {
        if (req.session) {
            req.session.destroy((err) => {
                res.clearCookie('connect.sid');
                req.session = null;
                if (err) {
                    console.log(err);
                    resolve(false);
                    return;
                }
                return resolve(true);
            });
        }
        return resolve(true);
    });
};
exports.logoutUser = logoutUser;
//# sourceMappingURL=logout.controller.js.map