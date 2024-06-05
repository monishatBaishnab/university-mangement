"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicDepartmentRoutes = void 0;
const express_1 = require("express");
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicDepartment_validation_1 = require("./academicDepartment.validation");
const router = (0, express_1.Router)();
router.get('/', academicDepartment_controller_1.academicDepartmentControllers.fetchAllAcademicDepartment);
router.get('/:id', academicDepartment_controller_1.academicDepartmentControllers.fetchSingleAcademicDepartment);
router.post('/', 
// validateRequest(
//   AcademicDepartmentValidations.createAcademicDepartmentValidationSchema,
// ),
academicDepartment_controller_1.academicDepartmentControllers.createAcademicDepartment);
router.patch('/:id', (0, validateRequest_1.default)(academicDepartment_validation_1.AcademicDepartmentValidations.updateAcademicDepartmentValidationSchema), academicDepartment_controller_1.academicDepartmentControllers.updateAcademicDepartment);
exports.academicDepartmentRoutes = router;
