"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const pathErrorHandler_1 = __importDefault(require("./app/middlewares/pathErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
// Middleware to parse JSON requests
app.use(express_1.default.json());
// Middleware to enable CORS for handling cross-origin requests
app.use((0, cors_1.default)());
// Use the main router for handling all routes starting from '/'
app.use('/api/v1/', routes_1.default);
// Middleware to handle any undefined routes (i.e., catch-all for 404 errors)
app.use('*', pathErrorHandler_1.default);
// Middleware to handle all global errors
app.use(globalErrorHandler_1.default);
exports.default = app;
