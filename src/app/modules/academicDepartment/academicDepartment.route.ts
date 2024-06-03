import { Router } from 'express';
import { academicDepartmentControllers } from './academicDepartment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidations } from './academicDepartment.validation';

const router = Router();

router.get('/', academicDepartmentControllers.fetchAllAcademicDepartment);

router.get(
  '/:id',
  validateRequest(
    AcademicDepartmentValidations.createAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.fetchSingleAcademicDepartment,
);

router.post('/', academicDepartmentControllers.createAcademicDepartment);

router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidations.updateAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.updateAcademicDepartment,
);

export const academicDepartmentRoutes = router;
