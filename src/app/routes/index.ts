import { Router } from 'express';
import userRoute from '../modules/user/user.route';
import statusRouter from '../modules/status/status';
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.router';

const router = Router();

// Define an array of route configurations
const routes = [
  {
    path: '/',
    route: statusRouter,
  },
  {
    path: '/api/v1/users',
    route: userRoute,
  },
  {
    path: '/api/v1/academic-semesters',
    route: academicSemesterRoutes,
  },
];

// Loop through each route configuration in the routes array
routes.forEach(({ path, route }) =>
  // Use the router instance to use the specified route at the given path
  router.use(path, route),
);

export default router;
