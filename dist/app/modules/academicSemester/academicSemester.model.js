"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const academicSemester_constant_1 = require("./academicSemester.constant");
const academicSemesterSchema = new mongoose_1.Schema({
    name: { type: String, enum: academicSemester_constant_1.AcademicSemesterName, required: true },
    code: { type: String, enum: academicSemester_constant_1.AcademicSemesterCode, required: true },
    year: { type: String, required: true },
    startMonth: {
        type: String,
        enum: academicSemester_constant_1.Months,
        required: true,
    },
    endMonth: {
        type: String,
        enum: academicSemester_constant_1.Months,
        required: true,
    },
});
const AcademicSemesterModel = (0, mongoose_1.model)('AcademicSemester', academicSemesterSchema);
exports.default = AcademicSemesterModel;
