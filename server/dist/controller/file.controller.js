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
exports.viewPinnedFile = exports.pinFile = exports.uploadAndCompareFiles = void 0;
const uuid_1 = require("uuid");
const upload_util_1 = require("../utils/upload.util");
const postgres_1 = __importDefault(require("../db/postgres"));
const logger_utils_1 = require("../utils/logger.utils");
const uploadAndCompareFiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { comparisonColumns1, comparisonColumns2, fileStructure1, fileStructure2, unformattedData1, unformattedData2, userSubscriptionType, userFreeComparisons, userEmail, allColumns1, allColumns2 } = req.body;
    const sales_file1 = fileStructure1 === upload_util_1.FORMATTED_DATA ? req.files[0] : null;
    let sales_file2;
    if (fileStructure2 === upload_util_1.FORMATTED_DATA) {
        if (!!sales_file1) {
            sales_file2 = req.files[1];
        }
        else {
            sales_file2 = req.files[0];
        }
    }
    let salesData1 = [];
    let salesData2 = [];
    try {
        salesData1 = (0, upload_util_1.createSalesDataArray)(fileStructure1, unformattedData1, sales_file1 ? sales_file1.path : null);
        salesData2 = (0, upload_util_1.createSalesDataArray)(fileStructure2, unformattedData2, sales_file2 ? sales_file2.path : null);
        const duplicatesList = (0, upload_util_1.findDuplicates)(salesData1, salesData2, comparisonColumns1.split(','), comparisonColumns2.split(','), fileStructure1, fileStructure2);
        const columns = (0, upload_util_1.setupResultColumns)(allColumns1 ? allColumns1.split(',') : null, allColumns2 ? allColumns2.split(',') : null, fileStructure1, fileStructure2);
        const result = (0, upload_util_1.setupResults)(duplicatesList, columns);
        if (userSubscriptionType === 'FREE') {
            yield (0, postgres_1.default)('users')
                .update({
                free_comparisons: parseInt(userFreeComparisons) + 1
            })
                .where({ email: userEmail });
        }
        res.send(result);
    }
    catch (err) {
        console.log('err ', err);
        logger_utils_1.logger.error(`compare files error - email: ${userEmail} - err: ${err}`);
        return res.status(400).send();
    }
});
exports.uploadAndCompareFiles = uploadAndCompareFiles;
const pinFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, file_label } = req.body;
    const pinned_file_id = req.body.pinned_file_id || (0, uuid_1.v4)();
    try {
        const [user] = yield (0, postgres_1.default)('users').select('userid').where({ email });
        const fileMetadata = {
            file_label,
            pinned_file_id,
            user_id: user.userid
        };
        if (req.files && req.files.sales_file) {
            const file = req.files.sales_file[0];
            fileMetadata.file_name = file.originalname;
            yield (0, upload_util_1.storeFile)(file, pinned_file_id);
        }
        yield (0, upload_util_1.updatePinnedFileTable)(fileMetadata, res);
    }
    catch (err) {
        logger_utils_1.logger.error(`pin file error - pinned file: ${pinned_file_id} - err: ${err}`);
        return res.status(400).send();
    }
    ;
});
exports.pinFile = pinFile;
const viewPinnedFile = (req, res) => {
    const { pinnedFileId } = req.query;
    (0, upload_util_1.readPinnedFile)(pinnedFileId)
        .then((data) => {
        return res.status(200).send(data);
    })
        .catch((err) => {
        logger_utils_1.logger.error(`view pinned file error - pinned file: ${pinnedFileId} - err: ${err}`);
        return res.status(400).send();
    });
};
exports.viewPinnedFile = viewPinnedFile;
//# sourceMappingURL=file.controller.js.map