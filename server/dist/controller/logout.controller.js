"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = void 0;
const auth_utils_1 = require("../utils/auth.utils");
const logoutUser = (_, res) => {
    (0, auth_utils_1.sendRefreshToken)(res, '');
    return res.status(200).send();
};
exports.logoutUser = logoutUser;
//# sourceMappingURL=logout.controller.js.map