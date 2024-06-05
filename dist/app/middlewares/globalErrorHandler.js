"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
    let message = 'Something want wrong!';
    let errorSources = [
        {
            path: '',
            message: 'Something want wrong!',
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(err);
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
        statusCode = simplifiedError.statusCode;
    }
    else if (err.name === 'ValidationError') {
        const simplifiedError = (0, handleValidationError_1.default)(err);
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
        statusCode = simplifiedError.statusCode;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config_1.default.node_env === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null,
        // err
    });
};
exports.default = globalErrorHandler;
