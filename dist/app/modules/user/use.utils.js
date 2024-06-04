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
exports.generateStudentId = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const findLastStudentId = () => __awaiter(void 0, void 0, void 0, function* () {
    // Query the UserModel to find the most recently created student
    const lastStudent = yield user_model_1.default.findOne({
        role: 'student',
    }, { id: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
    // Return the last student ID or undefined if not found
    return (lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id) ? lastStudent.id : undefined;
});
//generate user id
const generateStudentId = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Initialize the current ID to '0000'
    let currentId = (0).toString().padStart(4, '0');
    // Retrieve the last student ID from the database
    const lastStudentId = yield findLastStudentId();
    // Extract the semester code from the last student ID
    const lastStudentSemesterCode = lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.substring(4, 6);
    // Extract the year from the last student ID
    const lastStudentYear = lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.substring(0, 4);
    // Get the current semester code from the payload
    const currentSemesterCode = payload.code;
    // Get the current year from the payload
    const currentStudentYear = payload.year;
    // Check if the last student ID exists and matches the current semester and year
    if (lastStudentId &&
        lastStudentSemesterCode === currentSemesterCode &&
        lastStudentYear === currentStudentYear) {
        // If matches, set the current ID to the numerical part of the last student ID
        currentId = lastStudentId.substring(6);
    }
    // Increment the current ID by 1 and pad it to ensure it is 4 digits long
    let incrementId = String(Number(currentId) + 1).padStart(4, '0');
    // Construct the new student ID by concatenating the year, semester code, and incremented ID
    incrementId = `${payload.year}${payload.code}${incrementId}`;
    return incrementId;
});
exports.generateStudentId = generateStudentId;
