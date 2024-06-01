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
    const lastStudent = yield user_model_1.default.findOne({
        role: 'student',
    }, { id: 1, _id: 0 }).sort({ createdAt: -1 }).lean();
    return (lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id) ? lastStudent.id.substring(6) : undefined;
});
//generate user id
const generateStudentId = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // first time 000
    const currentId = (yield findLastStudentId()) || (0).toString().padStart(4, '0');
    let incrementId = String(Number(currentId) + 1).padStart(4, '0');
    incrementId = `${payload.year}${payload.code}${incrementId}`;
    return incrementId;
});
exports.generateStudentId = generateStudentId;
