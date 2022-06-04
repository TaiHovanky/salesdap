"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readPinnedFile = exports.storeFile = exports.createResultRow = exports.setupResults = exports.setupResultColumns = exports.updateColumns = exports.findDuplicates = exports.createSalesDataArray = exports.parseJSONFromFile = exports.FORMATTED_DATA = exports.UNFORMATTED_DATA = void 0;
const fs = __importStar(require("fs"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
exports.UNFORMATTED_DATA = 'UNFORMATTED_DATA';
exports.FORMATTED_DATA = 'FORMATTED_DATA';
const parseJSONFromFile = (file) => {
    const fileBuffer = fs.readFileSync(file);
    if (fileBuffer) {
        return JSON.parse(fileBuffer.toString());
    }
    return [];
};
exports.parseJSONFromFile = parseJSONFromFile;
const createSalesDataArray = (fileStructure, unformattedData, filePath) => {
    let salesData = [];
    if (fileStructure === exports.FORMATTED_DATA) {
        salesData = (0, exports.parseJSONFromFile)(filePath);
    }
    else if (fileStructure === exports.UNFORMATTED_DATA) {
        salesData = unformattedData.split('\n');
    }
    return salesData;
};
exports.createSalesDataArray = createSalesDataArray;
const findDuplicates = (salesData1, salesData2, comparisonColumns1, comparisonColumns2, fileStructure1, fileStructure2) => {
    const valueHash = {};
    let resultsList = comparisonColumns1.map((_) => []);
    addCellValueToHash(salesData1, comparisonColumns1, valueHash, fileStructure1);
    checkForMatches(salesData1, salesData2, comparisonColumns2, valueHash, resultsList, fileStructure1, fileStructure2);
    return resultsList;
};
exports.findDuplicates = findDuplicates;
const sanitizeValue = (value) => {
    if (!value) {
        return '';
    }
    return typeof value === 'string' ?
        value.toLowerCase().trim() : value.toString().toLowerCase().trim();
};
const lookUpPropertyAndUpdateValueHash = (cellValue, valueHash, rowIndex) => {
    if (cellValue && !valueHash.hasOwnProperty(cellValue)) {
        valueHash[cellValue] = rowIndex;
    }
};
const addCellValueToHash = (salesData, comparisonColumnList, valueHash, fileStructure1) => {
    salesData.forEach((row, rowIndex) => {
        if (fileStructure1 === exports.FORMATTED_DATA) {
            comparisonColumnList.forEach((column) => {
                const cellValue = sanitizeValue(row[column]);
                lookUpPropertyAndUpdateValueHash(cellValue, valueHash, rowIndex);
            });
        }
        else {
            const cellValue = sanitizeValue(row);
            lookUpPropertyAndUpdateValueHash(cellValue, valueHash, rowIndex);
        }
    });
};
const updateMatchedIndexesForRow = (cellValue, valueHash, matchedIndxesForRow) => {
    if (cellValue && valueHash[cellValue]) {
        matchedIndxesForRow.push(valueHash[cellValue]);
    }
};
const checkForMatches = (salesData1, salesData2, comparisonColumnList, valueHash, resultsList, fileStructure1, fileStructure2) => {
    salesData2.forEach((row) => {
        const matchedIndxesForRow = [];
        if (fileStructure2 === exports.FORMATTED_DATA) {
            comparisonColumnList.forEach((column) => {
                const cellValue = sanitizeValue(row[column]);
                updateMatchedIndexesForRow(cellValue, valueHash, matchedIndxesForRow);
            });
        }
        else {
            const cellValue = sanitizeValue(row);
            updateMatchedIndexesForRow(cellValue, valueHash, matchedIndxesForRow);
        }
        const possibleMatches = {};
        matchedIndxesForRow.forEach((matchedRowIndex) => {
            if (!possibleMatches[matchedRowIndex]) {
                possibleMatches[matchedRowIndex] = 1;
            }
            else if (possibleMatches[matchedRowIndex]) {
                possibleMatches[matchedRowIndex] += 1;
            }
        });
        Array.from(Object.keys(possibleMatches)).forEach((key) => {
            let result = {};
            if (fileStructure1 === exports.FORMATTED_DATA) {
                result = Object.assign({}, salesData1[parseInt(key)]);
            }
            else {
                result = { 'Unformatted Data 1': salesData1[parseInt(key)] };
            }
            if (fileStructure2 === exports.FORMATTED_DATA) {
                result = Object.assign(Object.assign({}, result), row);
            }
            else {
                result = Object.assign(Object.assign({}, result), { 'Unformatted Data 2': row });
            }
            resultsList[possibleMatches[key] - 1].push(result);
        });
    });
};
const updateColumns = (fileStructure, comparisonColumns, documentNumber) => {
    let columns = [];
    if (fileStructure === exports.FORMATTED_DATA) {
        columns = columns.concat([...comparisonColumns]);
    }
    else if (fileStructure === exports.UNFORMATTED_DATA) {
        columns.push(`Unformatted Data ${documentNumber}`);
    }
    return columns;
};
exports.updateColumns = updateColumns;
const setupResultColumns = (comparisonColumns1, comparisonColumns2, fileStructure1, fileStructure2) => {
    let columns = [];
    columns = (0, exports.updateColumns)(fileStructure1, comparisonColumns1, 1);
    columns = [...columns, ...(0, exports.updateColumns)(fileStructure2, comparisonColumns2, 2)];
    return columns;
};
exports.setupResultColumns = setupResultColumns;
const setupResults = (duplicatesList, columns) => {
    const result = [];
    duplicatesList.forEach((resultsGroupForAccuracyLevel, resultsGroupForAccuracyLevelIdx) => {
        resultsGroupForAccuracyLevel.forEach((item) => {
            const row = (0, exports.createResultRow)(columns, item, resultsGroupForAccuracyLevelIdx + 1);
            result.push(row);
        });
    });
    return result;
};
exports.setupResults = setupResults;
const createResultRow = (columns, item, accuracy) => {
    return columns.reduce((rowObj, col) => {
        if (!!rowObj[col]) {
            if (typeof item !== 'string') {
                return Object.assign(Object.assign({}, rowObj), { [`${col}--2`]: item[col] || '' });
            }
            else {
                return Object.assign(Object.assign({}, rowObj), { [`${col}--2`]: item || '' });
            }
        }
        if (typeof item !== 'string') {
            return Object.assign(Object.assign({}, rowObj), { [col]: item[col] || '' });
        }
        else {
            return Object.assign(Object.assign({}, rowObj), { [col]: item || '' });
        }
    }, { accuracy });
};
exports.createResultRow = createResultRow;
const storeFile = (file, pinnedFileId) => new Promise((resolve, reject) => {
    const fileBuffer = fs.readFileSync(file.path);
    const s3 = new aws_sdk_1.default.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: pinnedFileId,
        Body: fileBuffer
    };
    s3.upload(params, (err, data) => {
        if (err) {
            return reject(err);
        }
        return resolve(data.location);
    });
});
exports.storeFile = storeFile;
const readPinnedFile = (pinnedFileId) => new Promise((resolve, reject) => {
    console.log('buckets', process.env.AWS_ACCESS_KEY_ID, process.env.AWS_BUCKET_NAME);
    const s3 = new aws_sdk_1.default.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: pinnedFileId,
    };
    s3.getObject(params, (err, data) => {
        if (err) {
            console.log('err reading pinned file', err);
            return reject(err);
        }
        console.log('data pinned file', data);
        return resolve(data.Body);
    });
});
exports.readPinnedFile = readPinnedFile;
//# sourceMappingURL=upload.util.js.map