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
exports.studentServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../user/user.model"));
const student_model_1 = require("./student.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const student_constant_1 = require("./student.constant");
const fetchAllStudentFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // const queryObj = { ...query };
    // let searchTerm = '';
    // const searchFields = ['name.firstName', 'email', 'permanentAddress', 'id'];
    // if (query?.searchTerm) {
    //   searchTerm = query?.searchTerm as string;
    // }
    // const excludeFiles = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    // excludeFiles?.forEach(el => delete queryObj[el]);
    // const searchQuery = Student.find({
    //   $or: searchFields.map((field) => ({
    //     [field]: { $regex: searchTerm, $options: 'i' }
    //   }))
    // })
    // .populate('admissionSemester')
    // .populate({
    //   path: 'academicDepartment',
    //   select: 'name academicFaculty -_id',
    //   populate: { path: 'academicFaculty', select: 'name -_id' },
    // });
    // const filterQuery = searchQuery.find(queryObj);
    // let sort = '-createdAt';
    // if (query?.sort) {
    //   sort = query?.sort as string;
    // }
    // const sortQuery = filterQuery.sort(sort);
    // let limit = 0;
    // let page = 0;
    // let skip = 0;
    // if (query?.limit) {
    //   limit = query?.limit as number;
    // }
    // if (query?.page) {
    //   page = query?.page as number;
    //   skip = (page - 1) * limit;
    // }
    // const pageQuery = sortQuery.skip(skip as number)
    // const limitQuery = pageQuery.limit(limit as number)
    // let fields = '-__v';
    // if(query?.fields){
    //   fields = (query?.fields as string)?.split(',').join(' ');
    // }
    // const fieldQuery = limitQuery.select(fields)
    const studentQuery = new QueryBuilder_1.default(student_model_1.Student.find(), query)
        .search(student_constant_1.studentSearchableFields)
        .filter()
        .paginate()
        .sort()
        .fields()
        .fields();
    const result = yield studentQuery.queryModel
        .populate('admissionSemester')
        .populate({
        path: 'academicDepartment',
        select: 'name academicFaculty -_id',
        populate: { path: 'academicFaculty', select: 'name -_id' },
    });
    return result;
});
const deleteStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        yield user_model_1.default.findOneAndUpdate({ id }, { isDeleted: true }, { new: true });
        const deleteStudent = yield student_model_1.Student.findOneAndUpdate({ id }, { isDeleted: true }, { new: true });
        yield session.commitTransaction();
        return deleteStudent;
    }
    catch (error) {
        session.abortTransaction();
    }
    finally {
        yield session.endSession();
    }
});
exports.studentServices = {
    fetchAllStudentFromDB,
    deleteStudentFromDB,
};
