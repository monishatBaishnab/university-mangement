import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import UserModel from './user.model';

const findLastUserId = async (role: string) => {
  // Query the UserModel to find the most recently created student
  const lastUser = await UserModel.findOne(
    {
      role,
    },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();

  // Return the last student ID or undefined if not found
  return lastUser?.id ? lastUser.id : undefined;
};

//generate user id
export const generateStudentId = async (payload: TAcademicSemester) => {
  // Initialize the current ID to '0000'
  let currentId = (0).toString().padStart(4, '0');

  // Retrieve the last student ID from the database
  const lastStudentId = await findLastUserId('student');

  // Extract the semester code from the last student ID
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);

  // Extract the year from the last student ID
  const lastStudentYear = lastStudentId?.substring(0, 4);

  // Get the current semester code from the payload
  const currentSemesterCode = payload.code;

  // Get the current year from the payload
  const currentStudentYear = payload.year;

  // Check if the last student ID exists and matches the current semester and year
  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentStudentYear
  ) {
    // If matches, set the current ID to the numerical part of the last student ID
    currentId = lastStudentId.substring(6);
  }

  // Increment the current ID by 1 and pad it to ensure it is 4 digits long
  let incrementId = String(Number(currentId) + 1).padStart(4, '0');
  // Construct the new student ID by concatenating the year, semester code, and incremented ID
  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};

export const generateFacultiesId =  async() => {
  // Initialize the current ID to '0000'
  let currentId = (0).toString().padStart(4, '0');

  // Retrieve the last student ID from the database
  const lastStudentId = await findLastUserId('faculty');

  // Check if the last student ID exists and matches the current semester and year
  if ( lastStudentId ) {
    // If matches, set the current ID to the numerical part of the last student ID
    currentId = lastStudentId.substring(2);
  }

  // Increment the current ID by 1 and pad it to ensure it is 4 digits long
  let incrementId = String(Number(currentId) + 1).padStart(4, '0');
  // Construct the new student ID by concatenating the year, semester code, and incremented ID
  incrementId = `F-${incrementId}`;

  return incrementId;
}