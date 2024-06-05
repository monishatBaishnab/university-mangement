import { Router } from 'express';
import userRoute from '../modules/user/user.route';
import statusRouter from '../modules/status/status';
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.router';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { studentRoutes } from '../modules/student/student.route';

const router = Router();

// Define an array of route configurations
const routes = [
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/students',
    route: studentRoutes,
  },
  {
    path: '/academic-semesters',
    route: academicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: academicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: academicDepartmentRoutes,
  },
];

// Use the statusRouter for all routes for check server status
router.use('/', statusRouter);

// Loop through each route configuration in the routes array
routes.forEach(({ path, route }) =>
  // Use the router instance to use the specified route at the given path
  router.use(path, route),
);

export default router;
