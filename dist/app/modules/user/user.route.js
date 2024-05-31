"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const student_validation_1 = require("../student/student.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const userRoute = express_1.default.Router();
userRoute.post('/', (0, validateRequest_1.default)(student_validation_1.createStudentValidationSchema), user_controller_1.UserController.createUser);
exports.default = userRoute;
