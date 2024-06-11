import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import createFacultyValidationSchema from "./faculty.validation";
import { facultyControllers } from "./faculty.controller";

const router = Router();

router.post('/', validateRequest(createFacultyValidationSchema), facultyControllers.createFaculty);

export const facultyRoutes = router;