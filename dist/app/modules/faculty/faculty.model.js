"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userNameSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true, trim: true, maxlength: 20 },
    middleName: { type: String, trim: true },
    lastName: { type: String, trim: true, required: true, maxlength: 20 },
}, { _id: false });
const facultySchema = new mongoose_1.Schema({
    id: { type: String },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'User',
    },
    name: { type: userNameSchema, required: true },
    designation: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'others'], required: true },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    profileImage: { type: String, required: true },
    academicFaculty: {
        type: mongoose_1.Schema.ObjectId,
        required: true,
        ref: 'AcademicFaculty',
    },
    academicDepartment: {
        type: mongoose_1.Schema.ObjectId,
        required: true,
        ref: 'AcademicDepartment',
    },
    isDeleted: { type: Boolean, required: true },
}, { timestamps: true });
const FacultyModel = (0, mongoose_1.model)('Faculty', facultySchema);
exports.default = FacultyModel;
