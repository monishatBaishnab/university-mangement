"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicSemester_validation_1 = require("./academicSemester.validation");
const academicSemester_controller_1 = require("./academicSemester.controller");
const router = (0, express_1.Router)();
router.post('/', (0, validateRequest_1.default)(academicSemester_validation_1.academicSemesterValidations.createAcademicSemesterValidationSchema), academicSemester_controller_1.academicSemesterControllers.createAcademicSemester);
router.get('/', academicSemester_controller_1.academicSemesterControllers.fetchAcademicSemesters);
router.get('/:semesterId', academicSemester_controller_1.academicSemesterControllers.fetchAcademicSemester);
router.patch('/:semesterId', (0, validateRequest_1.default)(academicSemester_validation_1.academicSemesterValidations.updateAcademicSemesterValidationSchema), academicSemester_controller_1.academicSemesterControllers.updateAcademicSemester);
exports.academicSemesterRoutes = router;
