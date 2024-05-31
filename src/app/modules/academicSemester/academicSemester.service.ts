import { TAcademicSemester } from "./academicSemester.interface";
import AcademicSemesterModel from "./academicSemester.model"

const createAcademicSemesterIntoDB = async (academicSemesterData: TAcademicSemester) => {
    const result = AcademicSemesterModel.create(academicSemesterData);
    return result;
}

export const academicSemesterServices = {
    createAcademicSemesterIntoDB
}