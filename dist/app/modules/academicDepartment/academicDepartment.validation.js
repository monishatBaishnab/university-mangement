"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentValidations = void 0;
const zod_1 = require("zod");
const createAcademicDepartmentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1),
        academicDepartment: zod_1.z.string().min(24)
    })
});
exports.AcademicDepartmentValidations = {
    createAcademicDepartmentValidationSchema
};
