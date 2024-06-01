import express from 'express';
import { UserController } from './user.controller';
import { createStudentValidationSchema } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';

const userRoute = express.Router();

userRoute.post(
  '/',
  validateRequest(createStudentValidationSchema),
  UserController.createUser,
);

export default userRoute;
