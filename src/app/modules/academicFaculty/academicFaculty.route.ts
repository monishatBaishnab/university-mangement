import { Router } from 'express';
import { academicFacultyControllers } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidations } from './academicFaculty.validation';

const router = Router();

router.get('/', academicFacultyControllers.getAllAcademicFaculty);

router.get('/:id', academicFacultyControllers.getSingleAcademicFaculty);

router.post(
  '/',
  validateRequest(
    AcademicFacultyValidations.createAcademicFacultyValidationSchema,
  ),
  academicFacultyControllers.createAcademicFaculty,
);

router.patch(
  '/:id',
  validateRequest(
    AcademicFacultyValidations.updateAcademicFacultyValidationSchema,
  ),
  academicFacultyControllers.updateAcademicFaculty,
);

export const academicFacultyRoutes = router;
