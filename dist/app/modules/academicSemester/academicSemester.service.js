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
exports.academicSemesterServices = void 0;
const academicSemester_constant_1 = require("./academicSemester.constant");
const academicSemester_model_1 = __importDefault(require("./academicSemester.model"));
const createAcademicSemesterIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (academicSemester_constant_1.academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error('Invalid semester code!');
    }
    const result = academicSemester_model_1.default.create(payload);
    return result;
});
const fetchAcademicSemestersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return academicSemester_model_1.default.find();
});
const fetchAcademicSemesterFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return academicSemester_model_1.default.find({ _id: id });
});
const updateAcademicSemesterFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the payload contains both code and name.
    // If both are present, verify that the code matches the expected code from academicSemesterNameCodeMapper.
    // If there is a mismatch, throw an error indicating an invalid semester code.
    if (payload.code &&
        payload.name &&
        academicSemester_constant_1.academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error('Invalid semester code!');
    }
    return academicSemester_model_1.default.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
});
exports.academicSemesterServices = {
    createAcademicSemesterIntoDB,
    fetchAcademicSemestersFromDB,
    fetchAcademicSemesterFromDB,
    updateAcademicSemesterFromDB,
};
