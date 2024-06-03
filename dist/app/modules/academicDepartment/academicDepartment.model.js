"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const academicDepartmentSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    academicFaculty: { type: mongoose_1.Schema.ObjectId, required: true }
});
const AcademicDepartmentModel = (0, mongoose_1.model)('AcademicDepartment', academicDepartmentSchema);
exports.default = AcademicDepartmentModel;
