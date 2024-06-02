import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import UserModel from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await UserModel.findOne(
    {
      role: 'student',
    },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};

//generate user id
export const generateStudentId = async (payload: TAcademicSemester) => {
  // first time 000
  let currentId = (0).toString().padStart(4, '0');

  const lastStudentId = await findLastStudentId();
  const lastStudentSemesterCode = lastStudentId?.substring(0, 3);
  const lastStudentYear = lastStudentId?.substring(4, 6);
  const currentSemesterCode = payload.code;
  const currentStudentYear = payload.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentStudentYear
  ) {
    currentId = lastStudentId.substring(6);
  }

  let incrementId = String(Number(currentId) + 1).padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
