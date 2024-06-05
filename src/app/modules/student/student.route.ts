import { Router } from 'express';
import { studentControllers } from './student.controller';

const router = Router();

router.delete('/:id', studentControllers.deleteStudent);

export const studentRoutes = router;
