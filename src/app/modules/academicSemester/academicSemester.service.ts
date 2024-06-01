import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import AcademicSemesterModel from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code!');
  }

  const result = AcademicSemesterModel.create(payload);
  return result;
};

const fetchAcademicSemestersFromDB = async () => {
  return AcademicSemesterModel.find();
};

const fetchAcademicSemesterFromDB = async (id: string) => {
  return AcademicSemesterModel.find({ _id: id });
};

const updateAcademicSemesterFromDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  // Check if the payload contains both code and name.
  // If both are present, verify that the code matches the expected code from academicSemesterNameCodeMapper.
  // If there is a mismatch, throw an error indicating an invalid semester code.
  if (
    payload.code &&
    payload.name &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid semester code!');
  }

  return AcademicSemesterModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
};

export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
  fetchAcademicSemestersFromDB,
  fetchAcademicSemesterFromDB,
  updateAcademicSemesterFromDB,
};
