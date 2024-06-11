"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createFacultyNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(1)
        .max(20)
        .refine((value) => /^[A-Z]/.test(value), {
        message: 'First Name must start with a capital letter',
    }),
    middleName: zod_1.z.string(),
    lastName: zod_1.z.string(),
});
const createFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string(),
        faculty: zod_1.z.object({
            id: zod_1.z.string().optional(),
            user: zod_1.z.string(),
            name: createFacultyNameValidationSchema,
            designation: zod_1.z.string(),
            gender: zod_1.z.enum(['male', 'female', 'others']),
            dateOfBirth: zod_1.z.string(),
            email: zod_1.z.string().email(),
            contactNo: zod_1.z.string(),
            emergencyContactNo: zod_1.z.string(),
            bloodGroup: zod_1.z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
            presentAddress: zod_1.z.string(),
            permanentAddress: zod_1.z.string(),
            profileImage: zod_1.z.string().optional(),
            academicFaculty: zod_1.z.string(),
            academicDepartment: zod_1.z.string(),
            isDeleted: zod_1.z.boolean(),
        })
    })
});
exports.default = createFacultyValidationSchema;
