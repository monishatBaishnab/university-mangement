import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    academicDepartment: z.string().min(24),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    academicDepartment: z.string().min(24).optional(),
  }),
});

export const AcademicDepartmentValidations = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
