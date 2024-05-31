import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidations } from './academicSemester.validation';
import { academicSemesterControllers } from './academicSemester.controller';

const router = Router();

router.post(
  '/',
  validateRequest(
    academicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  academicSemesterControllers.createAcademicSemester,
);

export const academicSemesterRoutes = router;
