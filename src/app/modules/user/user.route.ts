import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import { AnyZodObject } from 'zod';
import { createStudentValidationSchema } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';

const userRoute = express.Router();

userRoute.post(
  '/',
  validateRequest(createStudentValidationSchema),
  UserController.createUser,
);

export default userRoute;
