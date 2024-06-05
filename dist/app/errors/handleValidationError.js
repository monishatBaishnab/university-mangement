"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const handleValidationError = (err) => {
    const message = 'Validation error!';
    const statusCode = http_status_1.default.BAD_REQUEST;
    const errorSources = Object.values(err === null || err === void 0 ? void 0 : err.errors).map((error) => {
        return {
            path: error === null || error === void 0 ? void 0 : error.path,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    });
    return {
        message,
        errorSources,
        statusCode,
    };
};
exports.default = handleValidationError;
