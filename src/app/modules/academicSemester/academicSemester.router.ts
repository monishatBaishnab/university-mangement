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

router.get('/', academicSemesterControllers.fetchAcademicSemesters);

router.get('/:semesterId', academicSemesterControllers.fetchAcademicSemester);

router.patch('/:semesterId', academicSemesterControllers.updateAcademicSemester);

export const academicSemesterRoutes = router;
