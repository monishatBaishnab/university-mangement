"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const academicSemester_constant_1 = require("./academicSemester.constant");
const AppError_1 = require("../../errors/AppError");
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
academicSemesterSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const name = this.name;
        const isSemesterExists = yield AcademicSemesterModel.findOne({
            year: this.year,
            name: this.name,
        });
        if (isSemesterExists) {
            throw new Error('Semester is already exists.');
        }
        next();
    });
});
academicSemesterSchema.pre('findOneAndUpdate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = this.getQuery();
        const isExists = yield AcademicSemesterModel.findOne(query);
        if (!isExists) {
            throw new AppError_1.AppError(404, 'Semester does not exist!');
        }
        next();
    });
});
const AcademicSemesterModel = (0, mongoose_1.model)('AcademicSemester', academicSemesterSchema);
exports.default = AcademicSemesterModel;
