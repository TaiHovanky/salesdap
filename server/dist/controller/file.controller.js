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
const db_1 = __importDefault(require("../db"));
const uploadAndCompareFiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { comparisonColumns1, comparisonColumns2, fileStructure1, fileStructure2, unformattedData1, unformattedData2 } = req.body;
    const { sales_file1, sales_file2 } = req.files;
    let salesData1 = [];
    let salesData2 = [];
    try {
        salesData1 = (0, upload_util_1.createSalesDataArray)(fileStructure1, unformattedData1, sales_file1 ? sales_file1[0].path : null);
        salesData2 = (0, upload_util_1.createSalesDataArray)(fileStructure2, unformattedData2, sales_file2 ? sales_file2[0].path : null);
        const duplicatesList = (0, upload_util_1.findDuplicates)(salesData1, salesData2, comparisonColumns1.split(','), comparisonColumns2.split(','), fileStructure1, fileStructure2);
        const columns = (0, upload_util_1.setupResultColumns)(comparisonColumns1.split(','), comparisonColumns2.split(','), fileStructure1, fileStructure2);
        const result = (0, upload_util_1.setupResults)(duplicatesList, columns);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).send();
    }
});
exports.uploadAndCompareFiles = uploadAndCompareFiles;
const pinFile = (req, res) => {
    if (req.files && req.files.sales_file) {
        const file = req.files.sales_file[0];
        const { email } = req.body;
        const pinned_file_id = (0, uuid_1.v4)();
        const fileMetadata = {
            pinned_filename: file.originalname,
            pinned_file_id
        };
        (0, upload_util_1.storeFile)(file, pinned_file_id)
            .then(() => {
            (0, db_1.default)('users').update(fileMetadata).where({ email })
                .then(() => {
                res.status(200).json(fileMetadata);
            });
        })
            .catch((err) => {
            res.status(400).send();
            console.log('failed to pin file: ', err);
        });
    }
    else {
        res.status(400).send();
    }
};
exports.pinFile = pinFile;
const viewPinnedFile = (req, res) => {
    const { pinnedFileId } = req.query;
    (0, upload_util_1.readPinnedFile)(pinnedFileId)
        .then((data) => res.status(200).send(data))
        .catch((err) => {
        res.status(400).send();
        console.log('failed to get pinned file: ', err);
    });
};
exports.viewPinnedFile = viewPinnedFile;
//# sourceMappingURL=file.controller.js.map