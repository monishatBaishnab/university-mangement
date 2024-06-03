"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicFacultyRoutes = void 0;
const express_1 = require("express");
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicFaculty_validation_1 = require("./academicFaculty.validation");
const router = (0, express_1.Router)();
router.get('/', academicFaculty_controller_1.academicFacultyControllers.getAllAcademicFaculty);
router.get('/:id', academicFaculty_controller_1.academicFacultyControllers.getSingleAcademicFaculty);
router.post('/', (0, validateRequest_1.default)(academicFaculty_validation_1.AcademicFacultyValidations.createAcademicFacultyValidationSchema), academicFaculty_controller_1.academicFacultyControllers.createAcademicFaculty);
router.patch('/:id', (0, validateRequest_1.default)(academicFaculty_validation_1.AcademicFacultyValidations.updateAcademicFacultyValidationSchema), academicFaculty_controller_1.academicFacultyControllers.updateAcademicFaculty);
exports.academicFacultyRoutes = router;
