import { TFaculty } from "./faculty.interface";
import FacultyModel from "./faculty.model";

const createFacultyIntoDB = async(payload: TFaculty) => {
    // return await FacultyModel.create(payload);
}

export const facultyServices = {
    createFacultyIntoDB
}