"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRoutes = void 0;
const express_1 = require("express");
const student_controller_1 = require("./student.controller");
const router = (0, express_1.Router)();
router.delete('/:id', student_controller_1.studentControllers.deleteStudent);
exports.studentRoutes = router;
