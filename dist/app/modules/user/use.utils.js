"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStudentId = void 0;
//generate user id
const generateStudentId = (payload) => {
    // first time 000
    const currentId = (0).toString().padStart(4, '0');
    let incrementId = String(Number(currentId) + 1).padStart(4, '0');
    incrementId = `${payload.year}${payload.code}${incrementId}`;
    return incrementId;
};
exports.generateStudentId = generateStudentId;
