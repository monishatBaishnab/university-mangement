"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = __importDefault(require("../modules/user/user.route"));
const status_1 = __importDefault(require("../modules/status/status"));
const academicSemester_router_1 = require("../modules/academicSemester/academicSemester.router");
const router = (0, express_1.Router)();
// Define an array of route configurations
const routes = [
    {
        path: '/',
        route: status_1.default,
    },
    {
        path: '/api/v1/users',
        route: user_route_1.default,
    },
    {
        path: '/api/v1/academic-semesters',
        route: academicSemester_router_1.academicSemesterRoutes,
    },
];
// Loop through each route configuration in the routes array
routes.forEach(({ path, route }) => 
// Use the router instance to use the specified route at the given path
router.use(path, route));
exports.default = router;
