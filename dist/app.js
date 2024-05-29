"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_status_1 = __importDefault(require("http-status"));
const user_route_1 = __importDefault(require("./app/modules/user/user.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/users/', user_route_1.default);
app.get('/', (req, res) => {
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Server is running smoothly.',
    });
});
exports.default = app;
