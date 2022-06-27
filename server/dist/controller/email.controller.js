"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveEmail = void 0;
const logger_utils_1 = require("../utils/logger.utils");
const uuid_1 = require("uuid");
const postgres_1 = __importDefault(require("../db/postgres"));
const saveEmail = (req, res) => {
    const { email } = req.body;
    (0, postgres_1.default)('waitlist').insert({ id: (0, uuid_1.v4)(), email })
        .then(() => res.status(200).send())
        .catch((err) => {
        logger_utils_1.logger.error(`email waitlist err - ${email} - err: ${err}`);
        return res.status(400).send();
    });
};
exports.saveEmail = saveEmail;
//# sourceMappingURL=email.controller.js.map