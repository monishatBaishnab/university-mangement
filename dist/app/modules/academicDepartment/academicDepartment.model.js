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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const academicFaculty_model_1 = __importDefault(require("../academicFaculty/academicFaculty.model"));
const academicDepartmentSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    academicFaculty: { type: mongoose_1.Schema.ObjectId, required: true, ref: 'AcademicFaculty' },
}, { timestamps: true });
academicDepartmentSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const findAcademicFaculty = yield academicFaculty_model_1.default.findOne({
            _id: this.academicFaculty,
        });
        if (!findAcademicFaculty) {
            throw new Error('Academic Faculty not found!');
        }
        next();
    });
});
const AcademicDepartmentModel = (0, mongoose_1.model)('AcademicDepartment', academicDepartmentSchema);
exports.default = AcademicDepartmentModel;
