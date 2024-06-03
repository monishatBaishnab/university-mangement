import { z } from "zod";

const createAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1),
        academicDepartment: z.string().min(24)
    })
})

export const AcademicDepartmentValidations = {
    createAcademicDepartmentValidationSchema
}