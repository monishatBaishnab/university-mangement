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
const config_1 = __importDefault(require("../../config"));
const student_model_1 = require("../student/student.model");
const user_model_1 = __importDefault(require("./user.model"));
const createUserIntoDB = (password, studentData) => __awaiter(void 0, void 0, void 0, function* () {
    //create a user object
    const userData = {};
    //set use default password if password not given
    userData.password = password || config_1.default.default_password;
    //set use role
    userData.role = 'student';
    //generate user id
    const generateStudentId = (payload) => { };
    //set user id
    // userData.id = generateStudentId()
    //create new user
    const res = yield user_model_1.default.create(userData);
    if (Object.keys(res).length) {
        studentData.id = res.id;
        studentData.user = res._id;
        const newStudent = yield student_model_1.Student.create(studentData);
        return newStudent;
    }
});
exports.UserServices = {
    createUserIntoDB,
};
