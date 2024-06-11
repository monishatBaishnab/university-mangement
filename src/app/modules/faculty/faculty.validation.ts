import { z } from "zod";

const createFacultyNameValidationSchema = z.object({
    firstName: z
        .string()
        .min(1)
        .max(20)
        .refine((value) => /^[A-Z]/.test(value), {
            message: 'First Name must start with a capital letter',
        }),
    middleName: z.string(),
    lastName: z.string(),
});

const createFacultyValidationSchema = z.object({
    body: z.object({
        password: z.string(),
        faculty: z.object({
            id: z.string().optional(),
            user: z.string(),
            name: createFacultyNameValidationSchema,
            designation: z.string(),
            gender: z.enum(['male', 'female', 'others']),
            dateOfBirth: z.string(),
            email: z.string().email(),
            contactNo: z.string(),
            emergencyContactNo: z.string(),
            bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
            presentAddress: z.string(),
            permanentAddress: z.string(),
            profileImage: z.string().optional(),
            academicFaculty: z.string(),
            academicDepartment: z.string(),
            isDeleted: z.boolean(),
        })
    })
})

export default createFacultyValidationSchema;