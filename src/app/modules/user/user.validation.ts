import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string()
    .max(20, { message: 'Password cannot be more them 20 characters' })
    .optional(),
});

export const UserValidation = {
  userValidationSchema,
};
