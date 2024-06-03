import { TAcademicFaculty } from "./academicFaculty.interface";
import AcademicFacultyModel from "./academicFaculty.model";

const fetchAllAcademicFacultyFromDB = async () => {
    return AcademicFacultyModel.find();
}

const fetchSingleAcademicFacultyFromDB = async (id: string) => {
    return AcademicFacultyModel.findOne({ _id: id });
}

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
    return await AcademicFacultyModel.create(payload);
}

const updateAcademicFacultyIntoDB = async (id: string, payload: TAcademicFaculty) => {
    return await AcademicFacultyModel.findOneAndUpdate({ _id: id }, payload, { new: true });
}

export const academicFacultyServices = {
    createAcademicFacultyIntoDB,
    fetchAllAcademicFacultyFromDB,
    fetchSingleAcademicFacultyFromDB,
    updateAcademicFacultyIntoDB
}