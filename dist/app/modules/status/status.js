"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_1 = __importDefault(require("http-status"));
const statusRouter = (0, express_1.Router)();
statusRouter.get('/', (req, res) => {
    // Promise.reject()
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Server is running smoothly.',
    });
});
exports.default = statusRouter;
