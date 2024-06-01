import { TAcademicSemester } from '../academicSemester/academicSemester.interface';

//generate user id
export const generateStudentId = (payload: TAcademicSemester) => {
  // first time 000
  const currentId = (0).toString().padStart(4, '0');

  let incrementId = String(Number(currentId) + 1).padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
