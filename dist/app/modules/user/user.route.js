"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const student_validation_1 = require("../student/student.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const faculty_validation_1 = __importDefault(require("../faculty/faculty.validation"));
const userRoute = express_1.default.Router();
userRoute.post('/create-student', (0, validateRequest_1.default)(student_validation_1.createStudentValidationSchema), user_controller_1.UserController.createUser);
userRoute.post('/create-faculty', (0, validateRequest_1.default)(faculty_validation_1.default), user_controller_1.UserController.createFaculty);
exports.default = userRoute;
