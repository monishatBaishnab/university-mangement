"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultyRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const faculty_validation_1 = __importDefault(require("./faculty.validation"));
const faculty_controller_1 = require("./faculty.controller");
const router = (0, express_1.Router)();
router.post('/', (0, validateRequest_1.default)(faculty_validation_1.default), faculty_controller_1.facultyControllers.createFaculty);
exports.facultyRoutes = router;
