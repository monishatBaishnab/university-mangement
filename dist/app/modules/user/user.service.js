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
exports.UserServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../config"));
const academicSemester_model_1 = __importDefault(require("../academicSemester/academicSemester.model"));
const student_model_1 = require("../student/student.model");
const use_utils_1 = require("./use.utils");
const user_model_1 = __importDefault(require("./user.model"));
const AppError_1 = require("../../errors/AppError");
const http_status_1 = __importDefault(require("http-status"));
const createUserIntoDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //create a user object
    const userData = {};
    //set use default password if password not given
    userData.password = password || config_1.default.default_password;
    //set use role
    userData.role = 'student';
    // find academic semester info
    const admissionSemester = yield academicSemester_model_1.default.findOne({
        _id: payload.admissionSemester,
    });
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //set user id
        userData.id = yield (0, use_utils_1.generateStudentId)(admissionSemester);
        //create new user
        const newUser = yield user_model_1.default.create([userData], { session });
        if (!newUser.length) {
            throw new Error('Failed to create user!');
        }
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;
        const newStudent = yield student_model_1.Student.create([payload], { session });
        if (!newStudent.length) {
            throw new Error('Failed to create student!');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newStudent;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, error);
    }
});
exports.UserServices = {
    createUserIntoDB,
};
