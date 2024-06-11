import express from 'express';
import { UserController } from './user.controller';
import { createStudentValidationSchema } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import createFacultyValidationSchema from '../faculty/faculty.validation';

const userRoute = express.Router();

userRoute.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  UserController.createUser,
);

userRoute.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  UserController.createFaculty,
);

export default userRoute;
