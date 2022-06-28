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
require("dotenv/config");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const pinoHttp = require('pino-http')();
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const whitelist = ['https://salesdap.com', 'https://stripe.com', 'http://localhost:3000'];
    const corsOptions = {
        origin: (origin, callback) => {
            if (whitelist.indexOf(origin) !== -1 || origin.includes('amazonaws')) {
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
        methods: ["POST", "PUT", "GET"],
    };
    app.use((0, cors_1.default)(corsOptions));
    app.use((0, body_parser_1.default)());
    app.use((0, cookie_parser_1.default)());
    app.set('trust proxy', 1);
    app.use(pinoHttp);
    app.use('/', routes_1.default);
    app.listen(3001, () => {
        console.log('app listening at 3001');
    });
}))();
//# sourceMappingURL=index.js.map