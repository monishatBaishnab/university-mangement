import { TAcademicDepartment } from './academicDepartment.interface';
import AcademicDepartmentModel from './academicDepartment.model';

const fetchAllAcademicDepartmentFromDB = async () => {
  return await AcademicDepartmentModel.find();
};

const fetchSingleAcademicDepartmentFromDB = async (id: string) => {
  return await AcademicDepartmentModel.findOne({ _id: id }).populate('academicFaculty');
};

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  return await AcademicDepartmentModel.create(payload);
};

const updateAcademicDepartmentFromDB = async (
  id: string,
  payload: TAcademicDepartment,
) => {
  return await AcademicDepartmentModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
};

export const academicDepartmentServices = {
  fetchAllAcademicDepartmentFromDB,
  fetchSingleAcademicDepartmentFromDB,
  createAcademicDepartmentIntoDB,
  updateAcademicDepartmentFromDB,
};
