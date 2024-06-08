"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const HandleDuplicateError_1 = __importDefault(require("../errors/HandleDuplicateError"));
const AppError_1 = require("../errors/AppError");
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
    let message = (err === null || err === void 0 ? void 0 : err.message) || 'Something want wrong!';
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
    else if (err.name === 'CastError') {
        const simplifiedError = (0, handleCastError_1.default)(err);
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
        statusCode = simplifiedError.statusCode;
    }
    else if (err.code === 11000) {
        const simplifiedError = (0, HandleDuplicateError_1.default)(err);
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
        statusCode = simplifiedError.statusCode;
    }
    else if (err.code === 11000) {
        const simplifiedError = (0, HandleDuplicateError_1.default)(err);
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
        statusCode = simplifiedError.statusCode;
    }
    else if (err instanceof AppError_1.AppError) {
        message = err.message;
        errorSources = [
            {
                path: '',
                message: err.message,
            },
        ];
    }
    else if (err instanceof Error) {
        message = err.message;
        errorSources = [
            {
                path: '',
                message: err.message,
            },
        ];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        // stack: config.node_env === 'development' ? err?.stack : null,
        // err: err
    });
};
exports.default = globalErrorHandler;
